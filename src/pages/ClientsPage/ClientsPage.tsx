import type React from "react";
import { useEffect, useMemo, useState } from "react";

import type { Client } from "../../types";
import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import type { SortConfig } from "../../components/DataList/types";
import Button from "../../components/Button/Button";
import ClientForm from "../../components/ClientForm/ClientForm";
import DataList from "../../components/DataList/DataList";
import Modal from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  addClient,
  deleteClient,
  loadClients,
  selectClients,
  updateClient,
} from "../../store/clientsSlice";
import styles from "./ClientsPage.module.css";
import { clientColumns } from "../../utils/сonstants";
import { formatDate } from "../../utils/formaters";
import { v4 as uuidv4 } from "uuid";

type ModalMode = "create" | "edit" | null;

const ClientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectClients);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<Client> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  useEffect(() => {
    dispatch(loadClients());
  }, [dispatch]);

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

  const handleCreate = (data: ClientFormValues) => {
    const newClient: Client = {
      id: uuidv4(),
      name: data.name,
      phone: data.phone,
      email: data.email,
      company: data.company,
      website: data.website || undefined,
      comment: data.comment || undefined,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "user-1",
      deleted: false,
    };
    dispatch(addClient(newClient));
    handleModalClose();
  };

  const handleEdit = (data: ClientFormValues) => {
    if (selectedClient) {
      dispatch(
        updateClient({
          id: selectedClient.id,
          changes: {
            name: data.name,
            phone: data.phone,
            email: data.email,
            company: data.company,
            website: data.website || undefined,
            comment: data.comment || undefined,
          },
        }),
      );
      handleModalClose();
    }
  };

  const handleDelete = () => {
    if (selectedClient) {
      dispatch(deleteClient(selectedClient.id));
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

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Клиенты</h1>
      </div>
      <div className={styles.listSection}>
        <div className={styles.toolbar}>
          <Button onClick={handleNewClient} size="md" variant="primary">
            Новый клиент
          </Button>
          <div className={styles.searchInput}>
            <input
              className={styles.searchField}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Искать"
              type="search"
              value={searchQuery}
            />
          </div>
        </div>
        <div className={styles.listContainer}>
          <DataList
            columns={clientColumns}
            getItemId={(item) => item.id}
            isItemDeleted={(item) => item.deleted === true}
            items={displayClients}
            onItemClick={handleRowClick}
            onSort={handleSort}
            sortConfig={sortConfig}
          />
        </div>
      </div>
      <Modal
        headerRight={
          modalMode === "edit" && selectedClient
            ? `добавлен ${formatDate(selectedClient.createdAt)}`
            : undefined
        }
        isOpen={modalMode !== null}
        onClose={handleModalClose}
        title={modalTitle}
      >
        {modalMode === "create" && (
          <ClientForm
            onCancel={handleModalClose}
            onSubmit={handleCreate}
            submitLabel="Создать"
          />
        )}
        {modalMode === "edit" && selectedClient && (
          <ClientForm
            defaultValues={editDefaultValues}
            onCancel={handleModalClose}
            onDelete={handleDelete}
            onSubmit={handleEdit}
            submitLabel="Редактировать"
          />
        )}
      </Modal>
    </div>
  );
};

export default ClientsPage;
