Create a Deals page in the DealsPage folder, similar to the ClientsPage. Deals Page
Deal fields: Name, Client, Description, Amount, Stage (status), Creation Date, Completion Date.
Deal statuses: New, In Progress, Completed, Canceled.
List: contains all deal fields, with the ability to sort and filter (search) by all fields. Clicking on a row opens a modal editing window.

The page component must consist of a “New Deal” Button component, a search input field, and a DataList with deal data. Clicking on a deal opens a modal window (Modal component) for editing the deal, containing a Form component with the deal values pre-filled in the input fields and a “Complete Deal” button. Clicking the “New Deal” button opens a modal window (Modal component) for creating a new deal (with a Form component). All actions involving deals must be updated in the store via the dealsSlice. Edit the dealsSlice so that when a deal is canceled, it is not removed from the list but is marked as canceled, and its background color changes to #FFF7ED. A new deal should be marked as new, with a background color of #EFF6FF. A completed deal should be marked as completed in the store, with a background color of #F0FDF4.

Refer to the types in the types folder, specifically the deal file.
The page should adapt to different screen widths

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

jsx deals page for 1440px width with a hidden sidebar:
```
<div style={{width: 1368, height: 800, paddingTop: 24, paddingBottom: 40, paddingLeft: 32, paddingRight: 32, background: '#F9FAFB', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
    <div style={{color: '#1F2937', fontSize: 30, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 36, wordWrap: 'break-word'}}>Сделки</div>
  </div>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
      <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
        <div data-state="Default" data-type="Primary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Новая сделка</div>
        </div>
        <div style={{flex: '1 1 0', alignSelf: 'stretch', paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
          <div data-name="Search" style={{width: 16, height: 16, position: 'relative'}}>
            <div style={{width: 16, height: 16, left: 0, top: 0, position: 'absolute', outline: '1.50px #9CA3AF solid', outlineOffset: '-0.75px'}} />
          </div>
          <div style={{color: '#9CA3AF', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Искать</div>
        </div>
      </div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
      <div style={{alignSelf: 'stretch', paddingLeft: 18, overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
        <div style={{width: 296, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Название</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 116, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Клиент</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Описание</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 144, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Этап (статус)</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 88, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сумма</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 115, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Дата создания</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 133, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Дата завершения</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Сварог 2024»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ярополк</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Запуск нового проекта с расширением услуг</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 000 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>5 ноября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#F0FDF4', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Обновление сайта Светлояр</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Светлана</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Обновление контента и UX/UI</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#10B981', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Завершена</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>450 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>1 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>20 октября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Радуга 2025»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радомир</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Начало сотрудничества для разработки</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>800 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>20 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#FFF7ED', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Логистический контракт «Миловид»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Милана</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Оптимизация логистических процессов</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#F59E0B', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Отменена</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>600 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>11 сентября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Разработка ПО для Добрыни</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Создание внутренней CRM-системы</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>5 200 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>17 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#F0FDF4', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Ладомир»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Лада</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Подготовка к запуску нового продукта</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#10B981', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Завершена</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 300 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>8 августа 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>1 октября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#F0FDF4', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Консультации для компании «Яро» по бизнес-процессам</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ярослав</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Проведение серии встреч по оптимизации процессов</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#10B981', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Завершена</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>750 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>1 июня 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>30 июня 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Миролюб — Интеграция</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радмила</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Интеграция систем управления</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 750 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>24 сентября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>«Ясновид CRM»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ясна</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Разработка и внедрение CRM-системы</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>4 500 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>12 сентября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>ИТ-проект «БоярДев»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Боярин</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Разработка платформы для аналитики</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>6 000 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>30 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Разработка ПО для Добрыни</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Создание внутренней CRM-системы</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>2 200 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>17 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Миролюб — Интеграция</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радмила</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Интеграция систем управления</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>750 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>24 сентября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Консалтинг по IT-оптимизации</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Доброгост</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Анализ и внедрение IT-решений для повышения эффективности</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 100 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>20 августа 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Сайт для компании «Сварожичи»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Сварожичи</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Создание корпоративного сайта с интерактивными функциями</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>350 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>5 сентября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 280, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Подготовка к семинару «Инновации-2024»</div>
          </div>
          <div style={{width: 100, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Величана</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Организация и подготовка обучающего семинара</div>
          </div>
          <div style={{width: 80, overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 88, textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>500 000 ₽</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>22 октября 2024</div>
          <div style={{width: 116, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>—</div>
        </div>
      </div>
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

