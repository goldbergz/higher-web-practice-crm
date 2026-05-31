import { profileSections } from "../../utils/constants/сonstants";
import { profileSchema } from "../../utils/schemas/profileSchema";
import Button from "../Button/Button";
import Form from "../Form/Form";

import type { ProfileFormValues } from "../../types";
import type React from "react";

interface ProfileFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
  serverErrors?: Partial<Record<string, string>>;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  defaultValues,
  onSubmit,
  serverErrors,
}) => {
  return (
    <Form<ProfileFormValues>
      ariaLabel="Форма настройки профиля"
      defaultValues={defaultValues}
      schema={profileSchema}
      sections={profileSections}
      serverErrors={serverErrors}
      onSubmit={onSubmit}
    >
      <Button type="submit" variant="primary">
        Сохранить изменения
      </Button>
    </Form>
  );
};

export default ProfileForm;
