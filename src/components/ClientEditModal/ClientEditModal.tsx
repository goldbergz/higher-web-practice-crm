import type React from "react";
import { useEffect, useState } from "react";

import type { Client, UpdateClientPayload } from "../../types";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import styles from "../Modal/Modal.module.css";

interface ClientEditModalProps {
  client: Client | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
  onSave: (id: string, data: UpdateClientPayload) => void;
}

const ClientEditModal: React.FC<ClientEditModalProps> = ({
  client,
  isOpen,
  onClose,
  onDelete,
  onSave,
}) => {
  const [formData, setFormData] = useState<UpdateClientPayload>({
    comment: "",
    company: "",
    email: "",
    name: "",
    phone: "",
    website: "",
  });

  useEffect(() => {
    if (client) {
      setFormData({
        comment: client.comment ?? "",
        company: client.company,
        email: client.email,
        name: client.name,
        phone: client.phone,
        website: client.website ?? "",
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (client) {
      onSave(client.id, formData);
    }
  };

  const handleDelete = () => {
    if (client) {
      onDelete(client.id);
    }
  };

  if (!client) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Редактирование клиента">
      <form onSubmit={handleSubmit}>
        <div className={styles.body}>
          <Input
            label="Имя"
            name="name"
            onChange={handleChange}
            required
            value={formData.name ?? ""}
          />
          <Input
            label="Телефон"
            name="phone"
            onChange={handleChange}
            required
            type="tel"
            value={formData.phone ?? ""}
          />
          <Input
            label="Email"
            name="email"
            onChange={handleChange}
            required
            type="email"
            value={formData.email ?? ""}
          />
          <Input
            label="Название компании"
            name="company"
            onChange={handleChange}
            required
            value={formData.company ?? ""}
          />
          <Input
            label="Сайт"
            name="website"
            onChange={handleChange}
            value={formData.website ?? ""}
          />
          <Input
            label="Комментарий"
            name="comment"
            onChange={handleChange}
            value={formData.comment ?? ""}
          />
        </div>
        <div className={styles.footer}>
          {!client.deleted && (
            <Button
              onClick={handleDelete}
              type="button"
              variant="ghost"
            >
              Удалить
            </Button>
          )}
          <Button onClick={onClose} type="button" variant="secondary">
            Отмена
          </Button>
          <Button type="submit" variant="primary">
            Сохранить
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ClientEditModal;
