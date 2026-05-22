напиши компонент Страницы клиентов (Clients)
страница состоит из инпута и кнопки для поиска клиентов. для этого используй уже существующие компоненты Button и Input.
После этого идет список клиентов. Для списка и каждого отдельного элемента списка создай отдельные компоненты, чтобы потом их можно было переиспользовать на других страницах, подставляя другие данные.
Поля клиента: Имя, Телефон, Email, Название компании, Сайт, Дата добавления, Комментарий.
Список: содержит все поля клиента, возможность сортировки и фильтрации (поиска) по всем полям. При нажатии на строку открывается модальное окно редактирования.
Удаление: при удалении клиент помечается как удалённый. С таким клиентом нельзя добавить сделку, но сделки с ним отображаются.
список клиентов будет получаться при запросе от сервера, но пока неделай логику апи, можешь подставить моковые данные.
при необходимости, можешь править существующие компоненты. главное, чтобы это не заэффектило и не повредило другие.

jsx for clients page (1440px) withour sidebar. Keep in mind that the page needs to adapt to both open and closed sidebars:
```
<div style={{alignSelf: 'stretch', alignSelf: 'stretch', paddingTop: 24, paddingBottom: 40, paddingLeft: 32, paddingRight: 32, background: '#F9FAFB', overflow: 'hidden', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 32, display: 'inline-flex'}}>
  <div style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
    <div style={{color: '#1F2937', fontSize: 30, fontFamily: 'Roboto', fontWeight: '700', lineHeight: 36, wordWrap: 'break-word'}}>Клиенты</div>
  </div>
  <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
      <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
        <div data-state="Default" data-type="Primary" style={{paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, background: '#3B82F6', borderRadius: 6, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
          <div style={{color: '#F9FAFB', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Новый клиент</div>
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
      <div style={{alignSelf: 'stretch', paddingLeft: 18, paddingRight: 4, overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', display: 'inline-flex'}}>
        <div style={{width: 95, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Имя</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 136, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Телефон</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 176, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Email</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 164, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Название компании</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 156, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сайт</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Комментарий</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
        <div style={{width: 84, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
          <div data-state="Default" style={{alignSelf: 'stretch', paddingLeft: 6, paddingRight: 6, justifyContent: 'flex-start', alignItems: 'center', gap: 2, display: 'inline-flex'}}>
            <div style={{color: '#9CA3AF', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Добавлен</div>
            <div data-name="Name14" style={{width: 16, height: 16, position: 'relative'}}>
              <div style={{width: 10, height: 5, left: 13, top: 12, position: 'absolute', transform: 'rotate(180deg)', transformOrigin: 'top left', outline: '1px #9CA3AF solid', outlineOffset: '-0.50px'}} />
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 2, display: 'flex'}}>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ярополк</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 911 987-65-43</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>yaropolk@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Сварог Инжиниринг</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.svarog-eng.com</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>На стадии переговоров.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>5 ноября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радомир</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 913 543-21-09</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>radomir@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Радуга</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.radu.ga</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Ведёт сложные проекты.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>20 октября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Добрыня</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 915 876-54-32</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>dobrinia@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Доброград</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.dobrograd.ru</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Прогнозируется рост активности.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>17 октября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Светозар</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 925 123-76-54</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>svetozara@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Светлояр</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.svetloyar.com</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Рекомендует новые проекты.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>1 октября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Радмила</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 917 238-65-43</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>radmila@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Миролюб</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.miroljub.ru</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Вовлечена в проектную деятельность.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>24 сентября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Велимир</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 921 123-45-67</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>velimir@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Вятичи</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.vyatichi.com</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Постоянный клиент, особое внимание к срокам.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>15 сентября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Ясна</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 914 908-76-32</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>yasna@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Ясновид</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.yasnovid.ru</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Работает над уникальными задачами.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>12 сентября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Милана</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 927 654-32-18</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>milana@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Миловид</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.milovid.ru</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Быстро реагирует на предложения.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>11 сентября 2024</div>
        </div>
        <div data-device="Desktop" data-state="Default" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: 'white', boxShadow: '0px 4px 8px #E5E7EB', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#1F2937', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Лада</div>
          <div style={{width: 120, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 929 123-48-59</div>
          <div style={{width: 160, color: '#3B82F6', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>lada@yandex.ru</div>
          <div style={{width: 148, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Ладомир</div>
          <div style={{width: 140, color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.ladomir.com</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#6B7280', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Долгосрочное сотрудничество.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#1F2937', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>8 августа 2024</div>
        </div>
        <div data-device="Desktop" data-state="Deleted" style={{alignSelf: 'stretch', height: 36, paddingLeft: 24, paddingRight: 24, paddingTop: 8, paddingBottom: 8, background: '#FEF2F2', overflow: 'hidden', borderRadius: 8, justifyContent: 'flex-start', alignItems: 'baseline', gap: 16, display: 'inline-flex'}}>
          <div style={{width: 79, color: '#D1D5DB', fontSize: 14, fontFamily: 'Inter', fontWeight: '400', lineHeight: 20, wordWrap: 'break-word'}}>Боярин</div>
          <div style={{width: 120, color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>+7 916 654-23-90</div>
          <div style={{width: 160, color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>boyarin@yandex.ru</div>
          <div style={{width: 148, color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>БоярДев</div>
          <div style={{width: 140, color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>www.boyardev.ru</div>
          <div style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>Специализируется на IT-разработках.</div>
          </div>
          <div style={{width: 120, textAlign: 'right', color: '#D1D5DB', fontSize: 12, fontFamily: 'Inter', fontWeight: '400', lineHeight: 16, wordWrap: 'break-word'}}>30 октября 2024</div>
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

