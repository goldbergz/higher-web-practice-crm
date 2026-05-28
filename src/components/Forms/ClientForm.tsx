import { clientSections, emptyValues } from "../../utils/constants/сonstants";
import { clientSchema } from "../../utils/schemas/clientSchema";
import Button from "../Button/Button";
import Form from "../Form/Form";

import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import type React from "react";

interface ClientFormProps {
  defaultValues?: ClientFormValues;
  onCancel: () => void;
  onDelete?: () => void;
  onSubmit: (data: ClientFormValues) => void;
  submitLabel: string;
}

const ClientForm: React.FC<ClientFormProps> = ({
  defaultValues,
  onCancel,
  onDelete,
  onSubmit,
  submitLabel,
}) => {
  return (
    <Form<ClientFormValues>
      ariaLabel="Форма клиента"
      defaultValues={defaultValues ?? emptyValues}
      schema={clientSchema}
      sections={clientSections}
      onSubmit={onSubmit}
    >
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
      {onDelete ? (
        <Button type="button" variant="danger" onClick={onDelete}>
          Удалить клиента
        </Button>
      ) : (
        <Button type="button" variant="secondary" onClick={onCancel}>
          Отменить
        </Button>
      )}
    </Form>
  );
};

export default ClientForm;
