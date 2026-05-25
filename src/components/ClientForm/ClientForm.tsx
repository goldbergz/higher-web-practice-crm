import type React from "react";

import type { ClientFormValues } from "../../utils/schemas/clientSchema";
import { clientSchema } from "../../utils/schemas/clientSchema";
import Button from "../Button/Button";
import Form from "../Form/Form";
import { clientSections, emptyValues } from "../../utils/сonstants";

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
      onSubmit={onSubmit}
      schema={clientSchema}
      sections={clientSections}
    >
      <Button type="submit" variant="primary">
        {submitLabel}
      </Button>
      {onDelete ? (
        <Button onClick={onDelete} type="button" variant="danger">
          Удалить клиента
        </Button>
      ) : (
        <Button onClick={onCancel} type="button" variant="secondary">
          Отменить
        </Button>
      )}
    </Form>
  );
};

export default ClientForm;
