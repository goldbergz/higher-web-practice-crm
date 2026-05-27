Two additional blocks need to be added to the main page:

1.  **Top 10 Active Deals** — This block should utilize the `DataList` component, styled identically to the list on the `DealsPage`, but without sorting capabilities. The fields to be displayed on the main page are: Title, Client, Amount, Status, and Creation Date. A button that opens a modal window for creating a new deal should be placed beneath the list.
2.  **Last 10 Tasks** — This block should be implemented similarly to the "Top 10 Active Clients" block, using the same styling. Each task card should display the following data, in this specific order: Task Title, the word "Deal," Deal Title, Due Date, and Task Status. A button that opens a modal window for creating a new task should be placed beneath the list.
    The task cards should feature the same highlighting scheme found on the `TasksPage`, varying according to the task's status.

jsx for Top 10 Active Deals block:

```
<div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Топ 10 активных сделок</div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Заключение договора</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Велимир</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>1 500 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>15 сентября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Сварог 2024»</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ярополк</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>3 000 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>5 ноября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Радуга 2025»</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радомир</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>2 800 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>20 октября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Разработка ПО для Добрыни</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>5 200 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>17 октября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Миролюб — Интеграция</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радмила</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>1 750 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>24 сентября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>«Ясновид CRM»</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ясна</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>4 500 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>12 сентября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>ИТ-проект «БоярДев»</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Боярин</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>6 000 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>30 октября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Заключение договора</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Велимир</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>1 500 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>15 сентября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Разработка ПО для Добрыни</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>2 200 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>17 октября 2024</div>
          </div>
        </div>
      </div>
      <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Миролюб — Интеграция</div>
          <div style={{width: 300, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радмила</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>750 000 ₽</div>
          </div>
          <div style={{width: 140, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
          <div style={{width: 120, justifyContent: 'flex-end', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>24 сентября 2024</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-state="Default" data-type="Primary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'flex'}}>
    <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Новая сделка</div>
  </div>
</div>
```

jsx for Last 10 Tasks block:

```
<div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Последние 10 задач</div>
    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Согласовать спецификации</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Сварог 2024»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 13 ноября</div>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
        </div>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Подготовить договор</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Заключение договора</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 17 ноября</div>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
        </div>
      </div>
      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Контроль</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>ИТ-проект «БоярДев»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 13 ноября</div>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
        </div>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Отправить КП</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Сварог 2024»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 16 ноября</div>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
        </div>
      </div>
      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Созвон с Добрыней</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Разработка ПО для Добрыни</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 15 ноября</div>
            <div style={{color: '#3B82F6', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
        </div>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Подготовить документы</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>«Ясновид CRM»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 12 ноября</div>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
        </div>
      </div>
      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Встреча с Радмилой</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Миролюб — Интеграция</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 17 ноября</div>
            <div style={{color: '#9CA3AF', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
          </div>
        </div>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Уточнить ТЗ</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Консалтинг по IT-оптимизации</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 17 ноября</div>
            <div style={{color: '#9CA3AF', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
          </div>
        </div>
      </div>
      <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: '#F0FDF4', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Подготовить документы</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>«Обновление сайта Светлояр»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 14 ноября</div>
            <div style={{color: '#10B981', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Завершена</div>
          </div>
        </div>
        <div data-property-1="Default" style={{alignSelf: 'stretch', paddingLeft: 16, paddingRight: 16, paddingTop: 12, paddingBottom: 12, background: '#F0FDF4', boxShadow: '0px 4px 8px #E5E7EB', borderRadius: 8, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
            <div style={{alignSelf: 'stretch', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '700', lineHeight: 20, wordWrap: 'break-word'}}>Согласовать правки</div>
            <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>сделка</div>
              <div style={{alignSelf: 'stretch', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Ладомир»</div>
            </div>
          </div>
          <div style={{alignSelf: 'stretch', justifyContent: 'flex-end', alignItems: 'baseline', gap: 4, display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', color: '#6B7280', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>до 14 ноября</div>
            <div style={{color: '#10B981', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Завершена</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-state="Default" data-type="Primary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'flex'}}>
    <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Новая задача</div>
  </div>
</div>
```

The distance between the blocks is 32 pixels.
Refer to the types in the types folder.
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

Write all utility functions in the `utils` folder in a file named `helpers`. Write common constants in the `constants.ts` file. Write form schemas in the `schemas` folder.

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
The layout has no semantic errors. Appropriate tags are used for elements. For example, all links must be formatted using `<a />`, and all forms using `<form />`, etc.
The project code does not cause errors or warnings in the browser console.
