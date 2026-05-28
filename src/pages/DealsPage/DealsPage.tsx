import { useEffect, useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "../../components/Button/Button";
import DataList from "../../components/DataList/DataList";
import DealForm from "../../components/Forms/DealForm";
import Modal from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../store";
import { loadClients, selectClients } from "../../store/clientsSlice";
import {
  addDeal,
  completeDeal,
  loadDeals,
  selectDeals,
  updateDeal,
} from "../../store/dealsSlice";
import { DEAL_STATUS_LABELS } from "../../utils/constants/dealConstants";
import { dealColumns } from "../../utils/constants/сonstants";
import { formatAmount, formatDate } from "../../utils/formaters";

import styles from "./DealsPage.module.css";

import type { SortConfig } from "../../components/DataList/types";
import type { Deal } from "../../types";
import type { DealDisplay } from "../../types/deal";
import type { DealFormValues } from "../../utils/schemas/dealSchema";
import type React from "react";
import { getDealRowStyleKey } from "../../utils/helpers";

type ModalMode = "create" | "edit" | null;

const DealsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const deals = useAppSelector(selectDeals);
  const clients = useAppSelector(selectClients);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig<DealDisplay> | null>(
    null,
  );
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  useEffect(() => {
    dispatch(loadDeals());
    dispatch(loadClients());
  }, [dispatch]);

  const getClientName = (clientId: string): string => {
    const client = clients.find((c) => c.id === clientId);
    return client?.name ?? "";
  };

  const filteredDeals = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return deals;

    return deals.filter((deal) => {
      const clientName = getClientName(deal.clientId).toLowerCase();
      const statusLabel = (DEAL_STATUS_LABELS[deal.status] ?? "").toLowerCase();
      const amountStr = formatAmount(deal.amount).toLowerCase();

      return (
        deal.title.toLowerCase().includes(query) ||
        clientName.includes(query) ||
        (deal.description ?? "").toLowerCase().includes(query) ||
        statusLabel.includes(query) ||
        amountStr.includes(query) ||
        deal.createdAt.includes(query) ||
        (deal.completedAt ?? "").includes(query)
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deals, searchQuery, clients]);

  const sortedDeals = useMemo(() => {
    if (!sortConfig) return filteredDeals;

    const { direction, key } = sortConfig;

    return [...filteredDeals]
      .map((deal) => ({
        deal,
        display: {
          amount: formatAmount(deal.amount),
          client: getClientName(deal.clientId),
          completedAt: deal.completedAt
            ? formatDate(deal.completedAt)
            : "\u2014",
          createdAt: formatDate(deal.createdAt),
          description: deal.description ?? "",
          id: deal.id,
          status: DEAL_STATUS_LABELS[deal.status] ?? deal.status,
          title: deal.title,
        },
      }))
      .sort((a, b) => {
        const aVal = a.display[key] ?? "";
        const bVal = b.display[key] ?? "";

        if (key === "amount") {
          const aNum = a.deal.amount;
          const bNum = b.deal.amount;
          return direction === "asc" ? aNum - bNum : bNum - aNum;
        }

        const comparison = String(aVal).localeCompare(String(bVal), "ru");
        return direction === "asc" ? comparison : -comparison;
      })
      .map((item) => item.deal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredDeals, sortConfig, clients]);

  const displayDeals: DealDisplay[] = useMemo(
    () =>
      sortedDeals.map((deal) => ({
        amount: formatAmount(deal.amount),
        client: getClientName(deal.clientId),
        completedAt: deal.completedAt ? formatDate(deal.completedAt) : "\u2014",
        createdAt: formatDate(deal.createdAt),
        description: deal.description ?? "",
        id: deal.id,
        status: DEAL_STATUS_LABELS[deal.status] ?? deal.status,
        title: deal.title,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sortedDeals, clients],
  );

  const getRowClassName = (item: DealDisplay): string | undefined => {
    const deal = deals.find((d) => d.id === item.id);
    if (!deal) return undefined;
    const key = getDealRowStyleKey(deal.status);
    const map = {
      new: styles.rowNew,
      completed: styles.rowCompleted,
      cancelled: styles.rowCancelled,
      in_progress: undefined,
    } as const;
    return key ? map[key] : undefined;
  };

  const getCellClassName = (
    item: DealDisplay,
    key: keyof DealDisplay,
  ): string | undefined => {
    if (key !== "status") return undefined;
    const deal = deals.find((d) => d.id === item.id);
    if (!deal) return undefined;
    const statusKey = getDealRowStyleKey(deal.status);
    const map = {
      new: styles.statusNew,
      in_progress: styles.statusInProgress,
      completed: styles.statusCompleted,
      cancelled: styles.statusCancelled,
    } as const;
    return statusKey ? map[statusKey] : undefined;
  };

  const handleSort = (key: keyof DealDisplay) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const handleRowClick = (item: DealDisplay) => {
    const originalDeal = deals.find((d) => d.id === item.id);
    if (originalDeal) {
      setSelectedDeal(originalDeal);
      setModalMode("edit");
    }
  };

  const handleNewDeal = () => {
    setSelectedDeal(null);
    setModalMode("create");
  };

  const handleModalClose = () => {
    setModalMode(null);
    setSelectedDeal(null);
  };

  const handleCreate = (data: DealFormValues) => {
    const newDeal: Deal = {
      id: uuidv4(),
      title: data.title,
      description: data.description || undefined,
      clientId: data.clientId,
      amount: Number(data.amount.replace(/\s/g, "")),
      status: data.status,
      createdAt: new Date().toISOString().split("T")[0],
      createdBy: "user-1",
    };
    dispatch(addDeal(newDeal));
    handleModalClose();
  };

  const handleEdit = (data: DealFormValues) => {
    if (selectedDeal) {
      dispatch(
        updateDeal({
          id: selectedDeal.id,
          changes: {
            title: data.title,
            description: data.description || undefined,
            amount: Number(data.amount.replace(/\s/g, "")),
            status: data.status,
          },
        }),
      );
      handleModalClose();
    }
  };

  const handleComplete = () => {
    if (selectedDeal) {
      dispatch(completeDeal(selectedDeal.id));
      handleModalClose();
    }
  };

  const activeClients = useMemo(
    () => clients.filter((c) => !c.deleted),
    [clients],
  );

  const modalTitle =
    modalMode === "create" ? "Новая сделка" : "Карточка сделки";

  const getFormStatus = (
    status: string,
  ): "new" | "in_progress" | "cancelled" => {
    if (status === "in_progress") return "in_progress";
    if (status === "cancelled") return "cancelled";
    return "new";
  };

  const editDefaultValues: DealFormValues | undefined = selectedDeal
    ? {
        amount: String(selectedDeal.amount),
        clientId: selectedDeal.clientId,
        description: selectedDeal.description ?? "",
        status: getFormStatus(selectedDeal.status),
        title: selectedDeal.title,
      }
    : undefined;

  const showCompleteButton =
    selectedDeal &&
    selectedDeal.status !== "completed" &&
    selectedDeal.status !== "cancelled";

  return (
    <div className={styles.page}>
      <div>
        <h1 className={styles.title}>Сделки</h1>
      </div>
      <div className={styles.listSection}>
        <div className={styles.toolbar}>
          <Button size="md" variant="primary" onClick={handleNewDeal}>
            Новая сделка
          </Button>
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
            columns={dealColumns}
            getCellClassName={getCellClassName}
            getItemId={(item) => item.id}
            getRowClassName={getRowClassName}
            items={displayDeals}
            sortConfig={sortConfig}
            onItemClick={handleRowClick}
            onSort={handleSort}
          />
        </div>
      </div>
      <Modal
        headerRight={
          modalMode === "edit" && selectedDeal
            ? `создана ${formatDate(selectedDeal.createdAt)}`
            : undefined
        }
        isOpen={modalMode !== null}
        title={modalTitle}
        onClose={handleModalClose}
      >
        {modalMode === "create" && (
          <DealForm
            clients={activeClients}
            submitLabel="Создать сделку"
            onCancel={handleModalClose}
            onSubmit={handleCreate}
          />
        )}
        {modalMode === "edit" && selectedDeal && (
          <DealForm
            clients={activeClients}
            defaultValues={editDefaultValues}
            submitLabel="Редактировать"
            onCancel={handleModalClose}
            onComplete={showCompleteButton ? handleComplete : undefined}
            onSubmit={handleEdit}
          />
        )}
      </Modal>
    </div>
  );
};

export default DealsPage;
