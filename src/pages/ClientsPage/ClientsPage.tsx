import type React from "react";
import { useEffect, useMemo, useState } from "react";

import type { Client, UpdateClientPayload } from "../../types";
import type { SortConfig } from "../../components/DataList/types";
import Button from "../../components/Button/Button";
import ClientEditModal from "../../components/ClientEditModal/ClientEditModal";
import DataList from "../../components/DataList/DataList";
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteClient, loadClients, selectActiveClients, updateClient } from "../../store/clientsSlice";
import styles from "./ClientsPage.module.css";
import { clientColumns } from "../../utils/сonstants";
import { formatDate } from "../../utils/formaters";

const ClientsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const clients = useAppSelector(selectActiveClients);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<Client> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  const handleSave = (id: string, data: UpdateClientPayload) => {
    dispatch(updateClient({ id, changes: data }));
    handleModalClose();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteClient(id));
    handleModalClose();
  };

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Клиенты</h1>
      </div>
      <div className={styles.listSection}>
        <div className={styles.toolbar}>
          <Button size="md" variant="primary">
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
      <ClientEditModal
        client={selectedClient}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onDelete={handleDelete}
        onSave={handleSave}
      />
    </div>
  );
};

export default ClientsPage;
