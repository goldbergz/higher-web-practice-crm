import type React from "react";

import type { ProfileFormValues } from "../../types";
import { profileSchema } from "../../utils/profileSchema";
import Button from "../Button/Button";
import Form from "../Form/Form";
import { profileSections } from "../../utils/сonstants";

interface ProfileFormProps {
  defaultValues: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({
  defaultValues,
  onSubmit,
}) => {
  return (
    <Form<ProfileFormValues>
      ariaLabel="Форма настройки профиля"
      defaultValues={defaultValues}
      onSubmit={onSubmit}
      schema={profileSchema}
      sections={profileSections}
    >
      <Button type="submit" variant="primary">
        Сохранить изменения
      </Button>
    </Form>
  );
};

export default ProfileForm;
