import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";
import { z } from "zod";

const testSchema = z.object({
  name: z.string().min(1, "Введите имя"),
  email: z.string().email("Введите корректный email"),
});

const sections = [
  {
    title: "Main Info",
    fields: [
      { label: "Name", name: "name" as const, type: "text" as const, required: true },
      { label: "Email", name: "email" as const, type: "email" as const, required: true },
    ],
  },
];

describe("Form", () => {
  it("renders section title and fields", () => {
    render(
      <Form
        schema={testSchema}
        sections={sections}
        onSubmit={jest.fn()}
        defaultValues={{ name: "", email: "" }}
      />,
    );
    expect(screen.getByText("Main Info")).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  });

  it("renders required indicator", () => {
    render(
      <Form
        schema={testSchema}
        sections={sections}
        onSubmit={jest.fn()}
        defaultValues={{ name: "", email: "" }}
      />,
    );
    const requiredIndicators = screen.getAllByText("*");
    expect(requiredIndicators).toHaveLength(2);
  });

  it("renders select field type", () => {
    const sectionsWithSelect = [
      {
        fields: [
          {
            label: "Status",
            name: "status" as const,
            type: "select" as const,
            options: [{ label: "Active", value: "active" }],
          },
        ],
      },
    ];

    const schema = z.object({ status: z.string() });

    render(
      <Form
        schema={schema}
        sections={sectionsWithSelect}
        onSubmit={jest.fn()}
        defaultValues={{ status: "" }}
      />,
    );
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("renders textarea field type", () => {
    const sectionsWithTextarea = [
      {
        fields: [
          { label: "Description", name: "description" as const, type: "textarea" as const },
        ],
      },
    ];

    const schema = z.object({ description: z.string() });

    render(
      <Form
        schema={schema}
        sections={sectionsWithTextarea}
        onSubmit={jest.fn()}
        defaultValues={{ description: "" }}
      />,
    );
    const textarea = screen.getByLabelText(/Description/);
    expect(textarea.tagName).toBe("TEXTAREA");
  });

  it("calls onSubmit with form data", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(
      <Form
        schema={testSchema}
        sections={sections}
        onSubmit={onSubmit}
        defaultValues={{ name: "", email: "" }}
      >
        <button type="submit">Submit</button>
      </Form>,
    );

    await user.type(screen.getByLabelText(/Name/), "John");
    await user.type(screen.getByLabelText(/Email/), "john@test.com");
    await user.click(screen.getByText("Submit"));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: "John", email: "john@test.com" }),
      expect.anything(),
    );
  });

  it("shows error messages from serverErrors", () => {
    render(
      <Form
        schema={testSchema}
        sections={sections}
        onSubmit={jest.fn()}
        defaultValues={{ name: "", email: "" }}
        serverErrors={{ email: "Email already taken" }}
      />,
    );
    expect(screen.getByText("Email already taken")).toBeInTheDocument();
  });
});
