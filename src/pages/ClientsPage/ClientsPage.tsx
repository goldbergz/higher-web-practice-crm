import { useMemo, useState } from "react";

import {
  useCreateClientMutation,
  useDeleteClientMutation,
  useGetClientsQuery,
  useUpdateClientMutation,
} from "../../api";
import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import ClientForm from "../../components/Forms/ClientForm";
import Modal from "../../components/Modal/Modal";
import { formatDate } from "../../helpers/formaters";
import { useAppSelector } from "../../store";
import { selectCurrentUser } from "../../store/userSlice";
import { clientColumns } from "../../utils/constants/сonstants";

import styles from "./ClientsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type { Client } from "../../types";
import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import type React from "react";
import { useMediaQuery } from "../../helpers/useMediaQuery";
import { MobileList } from "../../components";

type ModalMode = "create" | "edit" | null;

const ClientsPage: React.FC = () => {
  const currentUser = useAppSelector(selectCurrentUser);
  const { data: clients = [] } = useGetClientsQuery();
  const [createClient] = useCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  const isMobile = useMediaQuery("(max-width: 640px)");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<Client> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  const filteredClients = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return clients;

    return clients.filter((client) =>
      Object.values(client).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(query),
      ),
    );
  }, [clients, searchQuery]);

  const sortedClients = useMemo(() => {
    if (!sortConfig) return filteredClients;

    const { direction, key } = sortConfig;

    return [...filteredClients].sort((a, b) => {
      const aVal = a[key] ?? "";
      const bVal = b[key] ?? "";

      if (typeof aVal === "string" && typeof bVal === "string") {
        const comparison = aVal.localeCompare(bVal, "ru");
        return direction === "asc" ? comparison : -comparison;
      }

      return 0;
    });
  }, [filteredClients, sortConfig]);

  const displayClients = useMemo(
    () =>
      sortedClients.map((client) => ({
        ...client,
        createdAt: formatDate(client.createdAt),
      })),
    [sortedClients],
  );

  const handleSort = (key: keyof Client) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowClick = (item: Client) => {
    const originalClient = clients.find((c) => c.id === item.id);
    if (originalClient) {
      setSelectedClient(originalClient);
      setModalMode("edit");
    }
  };

  const handleNewClient = () => {
    setSelectedClient(null);
    setModalMode("create");
  };

  const handleModalClose = () => {
    setModalMode(null);
    setSelectedClient(null);
  };

  const handleCreate = async (data: ClientFormValues) => {
    if (!currentUser) return;

    await createClient({
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      website: data.website || undefined,
      comment: data.comment || undefined,
      createdBy: currentUser.id,
    });
    handleModalClose();
  };

  const handleEdit = async (data: ClientFormValues) => {
    if (selectedClient) {
      await updateClient({
        id: selectedClient.id,
        changes: {
          name: data.name,
          phone: data.phone,
          email: data.email,
          company: data.company,
          website: data.website || undefined,
          comment: data.comment || undefined,
        },
      });
      handleModalClose();
    }
  };

  const handleDelete = async () => {
    if (selectedClient) {
      await deleteClient(selectedClient.id);
      handleModalClose();
    }
  };

  const modalTitle =
    modalMode === "create" ? "Новый клиент" : "Карточка клиента";

  const editDefaultValues: ClientFormValues | undefined = selectedClient
    ? {
        comment: selectedClient.comment ?? "",
        company: selectedClient.company,
        email: selectedClient.email,
        name: selectedClient.name,
        phone: selectedClient.phone,
        website: selectedClient.website ?? "",
      }
    : undefined;

  const newClientButton = (
    <Button size="md" variant="primary" onClick={handleNewClient}>
      Новый клиент
    </Button>
  );

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Клиенты</h1>
      </div>
      <div className={styles.listSection}>
        <>
          <div className={styles.toolbar}>
            {!isMobile && newClientButton}
            <div className={styles.searchInput}>
              <input
                className={styles.searchField}
                placeholder="Искать"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.listContainer}>
            <DataList
              columns={clientColumns}
              getItemId={(item) => item.id}
              isItemDeleted={(item) => item.deleted === true}
              items={displayClients}
              sortConfig={sortConfig}
              onItemClick={handleRowClick}
              onSort={handleSort}
            />
          </div>
          <MobileList
            clients={sortedClients}
            type="client"
            onItemClick={(item) => {
              if ("name" in item && "phone" in item) {
                handleRowClick(item as Client);
              }
            }}
          />
          <div className={styles.mobileButton}>{newClientButton}</div>
        </>
      </div>
      <Modal
        headerRight={
          modalMode === "edit" && selectedClient
            ? `добавлен ${formatDate(selectedClient.createdAt)}`
            : undefined
        }
        isOpen={modalMode !== null}
        title={modalTitle}
        onClose={handleModalClose}
      >
        {modalMode === "create" && (
          <ClientForm
            submitLabel="Создать"
            onCancel={handleModalClose}
            onSubmit={handleCreate}
          />
        )}
        {modalMode === "edit" && selectedClient && (
          <ClientForm
            defaultValues={editDefaultValues}
            submitLabel="Редактировать"
            onCancel={handleModalClose}
            onDelete={handleDelete}
            onSubmit={handleEdit}
          />
        )}
      </Modal>
    </div>
  );
};

export default ClientsPage;
