Create a single modal window component that can be reused for modals related to editing and adding client data, deals, and tasks. Remove the existing modal windows and replace their usage in components with the new universal modal.
Display the modal window when creating a new client (by clicking the ```<Button size="md" variant="primary">
            New Client
          </Button>```
button) and when editing a client (by clicking on a DataListRow list item); the modal window should populate with the data of the client we clicked on.

When adding or modifying client data, the store must be updated via the clientsSlice slice. Verify that the data conforms to the client’s types and interfaces in folder 'types'.

Also, create a separate form component that can be reused in different components. Remove the old form and replace it with the new one in the components where it is used. The form should use existing Button and Input components.
Recommendations for forms: react-hook-form + zod
For pages with forms (clients, deals, tasks, profile), it’s convenient to use a schema-based validation approach:
react-hook-form handles form data collection, error handling, and onSubmit processing.
zod defines field contracts (type, required status, formats) in one place and allows you to set normalization centrally.
If you choose this combination, connect zodResolver so that zod errors are automatically passed to react-hook-form.
Best practice:
Perform validation based on the schema, not “on the fly” in handlers. This makes errors predictable and easier to test.
For text fields (e.g., comments), it’s helpful to normalize input at the schema level: use trim() and remove spaces so that clean values are passed to the submit payload.
In edit mode, use defaultValues / reset so that the form is populated with initial data.
Display errors next to the field (under the corresponding input), and mark required fields with an asterisk in the label.


Translated with DeepL.com (free version)

jsx modal (edit client):
```
<div style={{width: 580, padding: 24, background: 'white', boxShadow: '0px 8px 16px #E5E7EB', borderRadius: 12, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', overflow: 'hidden', justifyContent: 'space-between', alignItems: 'flex-start', display: 'inline-flex'}}>
      <div style={{color: '#1F2937', fontSize: 24, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>Карточка клиента</div>
      <div style={{textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>добавлен 17 октября 2024</div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Имя</div>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Добрыня</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Телефон</div>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>+7 915 876-54-32</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Компания</div>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Доброград</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сайт</div>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>www.dobrograd.ru</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Email</div>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>dobrinia@yandex.ru</div>
          </div>
        </div>
      </div>
      <div style={{width: 532, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Комментарий</div>
        <div data-state="Default" style={{alignSelf: 'stretch', height: 80, paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Прогнозируется рост активности.</div>
        </div>
      </div>
    </div>
  </div>
  <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
    <div data-state="Default" data-type="Primary" style={{flex: '1 1 0', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
      <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Редактировать</div>
    </div>
    <div data-state="Default" data-type="Secondary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
      <div style={{color: '#EF4444', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Удалить клиента</div>
    </div>
  </div>
</div>
```
jsx modal (new client):
```
<div style={{width: 580, padding: 24, background: 'white', boxShadow: '0px 8px 16px #E5E7EB', borderRadius: 12, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
      <div style={{color: '#1F2937', fontSize: 24, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 32, wordWrap: 'break-word'}}>Новый клиент</div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Имя</div>
          <div data-state="Placeholder" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Добрыня</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Телефон</div>
          <div data-state="Placeholder" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>+7 915 876-54-32</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Компания</div>
          <div data-state="Placeholder" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Доброград</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сайт</div>
          <div data-state="Placeholder" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>www.dobrograd.ru</div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'inline-flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Email</div>
          <div data-state="Placeholder" style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>dobrinia@yandex.ru</div>
          </div>
        </div>
      </div>
      <div style={{width: 532, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Комментарий</div>
        <div data-state="Placeholder" style={{alignSelf: 'stretch', height: 80, paddingLeft: 14, paddingRight: 14, paddingTop: 8, paddingBottom: 8, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', color: '#9CA3AF', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Прогнозируется рост активности.</div>
        </div>
      </div>
    </div>
  </div>
  <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
    <div data-state="Default" data-type="Primary" style={{flex: '1 1 0', paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
      <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Создать</div>
    </div>
    <div data-state="Default" data-type="Secondary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
      <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Отменить</div>
    </div>
  </div>
</div>
```

Coding Style
All code is formatted using Prettier.
All imports are sorted.
All HTML attributes are sorted.
ESLint is configured in the project and does not return any errors.
All variables in the project are written in CamelCase and reflect the meaning of the content.
All types in the project are named consistently and placed in a separate file.
If necessary, types are divided into separate files for each module.
Git commits must be meaningful and follow naming conventions.
The project repository has a well-formatted README.md.
Comments in the code must be meaningful and used only when it is impossible to describe behavior through variable and function names.
All console.log, alert, and debugger statements used during debugging have been removed.
There is no commented-out code in the project.
There are no inline styles, and the “!important” rule is not used.
There are no emojis or emoticons in the code, comments, or commit names.
The layout has no semantic errors. Appropriate tags are used for elements. For example, all links must be formatted using ```<a />```, and all forms using ```<form />```, etc.
The project code does not cause errors or warnings in the browser console.

