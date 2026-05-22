import type React from "react";
import { useMemo, useState } from "react";

import type { Client, UpdateClientPayload } from "../../types";
import type { ColumnConfig, SortConfig } from "../../components/DataList/types";
import Button from "../../components/Button/Button";
import ClientEditModal from "../../components/ClientEditModal/ClientEditModal";
import DataList from "../../components/DataList/DataList";
import { mockClients } from "../../mocks/clients";
import styles from "./ClientsPage.module.css";

const clientColumns: ColumnConfig<Client>[] = [
  { key: "name", label: "Имя", flex: "1 1 0", className: "cellName" },
  { key: "phone", label: "Телефон", flex: "1.4 1 0", className: "" },
  { key: "email", label: "Email", flex: "1.8 1 0", className: "cellEmail" },
  { key: "company", label: "Название компании", flex: "1.7 1 0", className: "" },
  { key: "website", label: "Сайт", flex: "1.6 1 0", className: "" },
  { key: "comment", label: "Комментарий", flex: "2.5 1 0", className: "cellComment" },
  { key: "createdAt", label: "Добавлен", flex: "1.2 1 0", className: "cellDate" },
];

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<Client> | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, ...data } : client,
      ),
    );
    handleModalClose();
  };

  const handleDelete = (id: string) => {
    setClients((prev) =>
      prev.map((client) =>
        client.id === id ? { ...client, deleted: true } : client,
      ),
    );
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
