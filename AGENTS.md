Create a reports page using tabs. Tabs are a user interface component that allows users to switch between different content sections within a single page. They are typically used in scenarios where there are multiple content variations, but it is important to keep them within a single view—ensuring the page does not reload and the main interface remains consistent.
The page should feature three distinct content sections and three corresponding tabs: Sales Report, Client Report, and Task Report. For now, implement only the Sales Report. The currently displayed section should be visually highlighted by changing the text color of its corresponding tab.
The Sales Report includes the following sections:

- **Overall Sales Report** (Header: "Overall Sales"): Displays all completed deals within a specified period (week, month, or quarter). The reporting period can be selected via a dropdown list. A maximum of 10 deals are displayed at a time, with pagination implemented for the remainder. Report fields include: Deal ID, Title, Client, Amount, and Completion Date. Deals can be sorted by each field in either ascending or descending order.
- **Deal Stages Report** (Header: "Deal Stages"): Analyzes deals based on their current stages (statuses: In Progress, New, Cancelled, Completed). Report fields include: Deal Stage, Number of Deals in Stage, and Total Value of Deals in Stage. The display can be configured for a specific period (week, month, or quarter), which can be selected via a dropdown list.

For each report, buttons for exporting data to PDF and XLSX formats should be available.

For the report lists, use the existing DataList component, which includes filtering capabilities; simply pass the necessary data to it. For the buttons, use the existing Button component. Additionally, create a separate component for the dropdown list so that it can be reused with different data sets.

Write all utility functions in the `utils` folder in a file named `helpers`. Write common constants in the constants folder. Write form schemas in the `schemas` folder. Refer to the types in the `types` folder.

jsx reports page for Sales Reports (For the SVG icons used for filtering, use the existing `SortArrowDown` and `SortArrowUp` instead of those shown in the jsx.):

```
<div style={{width: 1130, height: 800, paddingTop: 24, paddingBottom: 40, paddingLeft: 32, paddingRight: 32, background: '#F9FAFB', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
    <div style={{color: '#1F2937', fontSize: 30, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 36, wordWrap: 'break-word'}}>Отчёты</div>
  </div>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', display: 'flex'}}>
    <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
      <div data-state="Active" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{paddingLeft: 8, paddingRight: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div style={{color: '#2563EB', fontSize: 20, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Отчёты по продажам</div>
        </div>
        <div style={{alignSelf: 'stretch', height: 2, position: 'relative', background: '#2563EB', borderRadius: 2}} />
      </div>
      <div data-state="Default" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{paddingLeft: 8, paddingRight: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div style={{color: '#6B7280', fontSize: 20, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Отчёты по клиентам</div>
        </div>
        <div style={{width: 45, height: 2, position: 'relative'}} />
      </div>
      <div data-state="Default" style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center', display: 'inline-flex'}}>
        <div style={{paddingLeft: 8, paddingRight: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div style={{color: '#6B7280', fontSize: 20, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 28, wordWrap: 'break-word'}}>Отчёты по задачам</div>
        </div>
        <div style={{width: 45, height: 2, position: 'relative'}} />
      </div>
    </div>
  </div>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 24, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
      <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Общий, продажи</div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div data-state="Default" style={{paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>За неделю</div>
            <div data-name="Name5" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 16, height: 8, left: 16, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1.50px #6B7280 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div data-state="Default" style={{paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Списком</div>
            <div data-name="Name5" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 16, height: 8, left: 16, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1.50px #6B7280 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div data-state="Default" data-type="Secondary" style={{height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Экспорт в PDF</div>
        </div>
        <div data-state="Default" data-type="Secondary" style={{height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Экспорт в XLSX</div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 17, overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>ID сделки</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Название</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Клиент</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 8, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сумма</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 8, display: 'inline-flex'}}>
            <div data-state="Active sort" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Дата завершения</div>
              <div data-name="Sort up" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 11, left: 2, top: 3, position: 'absolute', outline: '1px #3B82F6 solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1003</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Древослав»</div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>3 000 000 ₽</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>21 сентября 2024</div>
          </div>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1001</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Ладомир»</div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Лада</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>2 300 000 ₽</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 октября 2024</div>
          </div>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1002</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Ярополк»</div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ясна</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1 500 000 ₽</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>12 октября 2024</div>
          </div>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1004</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Проект «Светлояр»</div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Светлана</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>900 000 ₽</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>5 ноября 2024</div>
          </div>
        </div>
      </div>
      <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
          <div data-state="Disabled" data-type="Arrow" style={{height: 32, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: '#F9FAFB', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 16, height: 8, outline: '1.50px #D1D5DB solid', outlineOffset: '-0.75px'}} />
          </div>
          <div data-state="Active" data-type="number" style={{width: 32, height: 32, padding: 8, background: '#3B82F6', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{color: '#F9FAFB', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1</div>
          </div>
          <div data-state="Disabled" data-type="Arrow" style={{height: 32, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, transform: 'rotate(-180deg)', transformOrigin: 'top left', background: '#F9FAFB', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 16, height: 8, outline: '1.50px #D1D5DB solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
      </div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 12, display: 'flex'}}>
      <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Этапы сделок</div>
      <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
        <div style={{justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div data-state="Default" style={{paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>За неделю</div>
            <div data-name="Name5" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 16, height: 8, left: 16, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1.50px #6B7280 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
          <div data-state="Default" style={{paddingLeft: 14, paddingRight: 14, paddingTop: 10, paddingBottom: 10, background: 'white', borderRadius: 4, outline: '1px #D1D5DB solid', outlineOffset: '-1px', justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'flex'}}>
            <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Списком</div>
            <div data-name="Name5" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 16, height: 8, left: 16, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1.50px #6B7280 solid', outlineOffset: '-0.75px'}} />
            </div>
          </div>
        </div>
        <div data-state="Default" data-type="Secondary" style={{height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Экспорт в PDF</div>
        </div>
        <div data-state="Default" data-type="Secondary" style={{height: 40, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, borderRadius: 8, outline: '2px #D1D5DB solid', outlineOffset: '-2px', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Экспорт в XLSX</div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 14, paddingRight: 17, overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Этап сделки</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Количество сделок на этапе</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
          <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-end', gap: 16, display: 'inline-flex'}}>
            <div data-state="Default" style={{paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
              <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Общая сумма сделок на этапе</div>
              <div data-name="Sort" style={{width: 16, height: 16, position: 'relative'}}>
                <div style={{width: 12, height: 8, left: 2, top: 4, position: 'absolute', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
              </div>
            </div>
          </div>
        </div>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1D4ED8', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>В работе</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>6</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>8 800 000 ₽</div>
          </div>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#EFF6FF', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Новая</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>4</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>2 000 000 ₽</div>
          </div>
          <div data-property-1="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#FFF7ED', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
            <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div style={{color: '#F59E0B', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Отменена</div>
            </div>
            <div style={{flex: '1 1 0', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1</div>
            <div style={{flex: '1 1 0', textAlign: 'right', color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>500 000 ₽</div>
          </div>
        </div>
      </div>
      <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 24, display: 'inline-flex'}}>
        <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
          <div data-state="Disabled" data-type="Arrow" style={{height: 32, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, background: '#F9FAFB', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 16, height: 8, outline: '1.50px #D1D5DB solid', outlineOffset: '-0.75px'}} />
          </div>
          <div data-state="Active" data-type="number" style={{width: 32, height: 32, padding: 8, background: '#3B82F6', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{color: '#F9FAFB', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>1</div>
          </div>
          <div data-state="Disabled" data-type="Arrow" style={{height: 32, paddingLeft: 12, paddingRight: 12, paddingTop: 8, paddingBottom: 8, transform: 'rotate(-180deg)', transformOrigin: 'top left', background: '#F9FAFB', overflow: 'hidden', borderRadius: 4, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
            <div style={{width: 16, height: 8, outline: '1.50px #D1D5DB solid', outlineOffset: '-0.75px'}} />
          </div>
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
The layout has no semantic errors. Appropriate tags are used for elements. For example, all links must be formatted using `<a />`, and all forms using `<form />`, etc.
The project code does not cause errors or warnings in the browser console.
