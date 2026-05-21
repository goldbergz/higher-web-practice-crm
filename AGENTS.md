Implement a component for the sidebar. It appears on all pages except the registration page and the home (login) page.
The sidebar menu should consist of a separate list component with individual list item components. At the bottom of the sidebar, display the user’s avatar (retrieved using the Avatar component) and their profile name.
At the top of the sidebar, there is a button implemented using the Button component. It hides the sidebar, leaving only the menu icons, and opens the sidebar.

JSX for the open sidebar for a screen width of 1440 pixels:
```
<div data-state="Expanded" style={{width: 310, alignSelf: 'stretch', paddingTop: 20, paddingBottom: 20, background: '#F9FAFB', borderRight: '1px #D1D5DB solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
      <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
        <div data-logo="Logo4" style={{flex: '1 1 0', overflow: 'hidden', justifyContent: 'flex-start', alignItems: 'center', gap: 4, display: 'flex'}}>
          <div style={{width: 24, height: 24, position: 'relative'}}>
            <div style={{width: 24, height: 24, left: 0, top: 0, position: 'absolute', background: '#1F2937', borderTopLeftRadius: 2, borderTopRightRadius: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 2}} />
          </div>
          <div style={{width: 74, height: 18, background: '#1F2937'}} />
        </div>
        <div data-name="Sidebar collapse" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
          <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', borderRadius: 2, outline: '1.50px #4B5563 solid', outlineOffset: '-0.75px'}} />
          <div style={{width: 10, height: 5, left: 13, top: 17, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '1.50px #4B5563 solid', outlineOffset: '-0.75px'}} />
        </div>
      </div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div data-state="Default" data-type="List item" style={{width: 310, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div data-name="Home" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 20, height: 19, left: 2, top: 2, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
              </div>
              <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Главная</div>
            </div>
          </div>
        </div>
      </div>
      <div data-state="Default" data-type="List item" style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
        <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div data-name="Team" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
              <div style={{width: 20, height: 18, left: 2, top: 3, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
            </div>
            <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Клиенты</div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div data-state="Default" data-type="List item" style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div data-name="Briefcase" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
              </div>
              <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Сделки</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div data-state="Default" data-type="List item" style={{width: 310, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div data-name="Task" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 20, height: 18, left: 2, top: 3, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
              </div>
              <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Отчёты</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 4, display: 'flex'}}>
        <div data-state="Default" data-type="List item" style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 16, display: 'inline-flex'}}>
          <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
            <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'flex'}}>
              <div data-name="Project" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
                <div style={{width: 18, height: 16.50, left: 3, top: 4, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
              </div>
              <div style={{color: '#1F2937', fontSize: 16, fontFamily: 'Inter', fontWeight: '400', lineHeight: 24, wordWrap: 'break-word'}}>Задачи</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-state="Active" data-type="User expand" style={{width: 310, paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'flex-start', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
    <div style={{justifyContent: 'flex-start', alignItems: 'center', gap: 12, display: 'flex'}}>
      <div style={{width: 40, height: 40, position: 'relative', background: '#1F2937', overflow: 'hidden', borderRadius: 44, outline: '1px #3B82F6 solid', outlineOffset: '-1px'}}>
        <img style={{width: 40, height: 40, left: 0, top: 0, position: 'absolute', borderRadius: 46}} src="https://placehold.co/40x40" />
      </div>
      <div style={{color: '#3B82F6', fontSize: 16, fontFamily: 'Inter', fontWeight: '700', lineHeight: 24, wordWrap: 'break-word'}}>Yaropolk</div>
    </div>
  </div>
</div>
```
JSX for the close sidebar for a screen width of 1440 pixels:
```
<div data-state="collapsed" style={{width: 72, height: 800, paddingTop: 20, paddingBottom: 20, background: '#F9FAFB', borderRight: '1px #D1D5DB solid', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'inline-flex'}}>
  <div style={{alignSelf: 'stretch', flex: '1 1 0', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 20, display: 'flex'}}>
    <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
      <div data-name="Sidebar expand" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
        <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', borderRadius: 2, outline: '1.50px #4B5563 solid', outlineOffset: '-0.75px'}} />
        <div style={{width: 10, height: 5, left: 18, top: 7, position: 'absolute', transform: 'rotate(90deg)', transformOrigin: 'top left', outline: '1.50px #4B5563 solid', outlineOffset: '-0.75px'}} />
      </div>
    </div>
    <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 16, display: 'flex'}}>
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: 8, display: 'flex'}}>
        <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div data-name="Home" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 20, height: 19, left: 2, top: 2, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div data-name="Team" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 20, height: 18, left: 2, top: 3, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div data-name="Briefcase" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 20, height: 20, left: 2, top: 2, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div data-name="Task" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 20, height: 18, left: 2, top: 3, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
        <div style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
          <div data-name="Project" style={{width: 24, height: 24, position: 'relative', overflow: 'hidden'}}>
            <div style={{width: 18, height: 16.50, left: 3, top: 4, position: 'absolute', outline: '1.50px #1F2937 solid', outlineOffset: '-0.75px'}} />
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-state="Default" data-type="User" style={{alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20, paddingTop: 8, paddingBottom: 8, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'inline-flex'}}>
    <div style={{flex: '1 1 0', height: 56, justifyContent: 'center', alignItems: 'center', gap: 8, display: 'flex'}}>
      <div style={{width: 32, height: 32, position: 'relative', background: '#1F2937', overflow: 'hidden', borderRadius: 44}}>
        <img style={{width: 32, height: 32, left: 0, top: 0, position: 'absolute', borderRadius: 46}} src="https://placehold.co/32x32" />
      </div>
    </div>
  </div>
</div>
```

svg icons for menu:
-home 
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 11.6477L11.1836 2.34214C11.6349 1.88595 12.3651 1.88595 12.8154 2.34214L22 11.6477M4.30769 9.30961V19.831C4.30769 20.4763 4.82462 21 5.46154 21H9.69231V15.9342C9.69231 15.2889 10.2092 14.7651 10.8462 14.7651H13.1538C13.7908 14.7651 14.3077 15.2889 14.3077 15.9342V21H18.5385C19.1754 21 19.6923 20.4763 19.6923 19.831V9.30961M8.15385 21H16.6154" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```
-clients
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.1519 18.6198L18.1529 18.6522C18.1529 18.8869 18.1406 19.1186 18.115 19.3471C16.2538 20.4335 14.1447 21.0035 11.9989 21C9.77326 21 7.68398 20.3989 5.88292 19.3471C5.85655 19.1056 5.84388 18.8628 5.84497 18.6198C5.84865 17.4373 6.1851 16.2802 6.81114 15.2838C7.36705 14.3968 8.13387 13.6667 9.04066 13.1611C9.94744 12.6555 10.9649 12.3908 11.9989 12.3913C13.0332 12.3906 14.0508 12.6553 14.9578 13.1609C15.8648 13.6665 16.6318 14.3966 17.1878 15.2838C17.8142 16.2801 18.1489 17.4382 18.1529 18.6209C19.4522 18.7289 20.7593 18.5586 21.9899 18.121C22.0369 17.5319 21.919 16.9412 21.6497 16.4174C21.3805 15.8936 20.9711 15.458 20.4687 15.1611C19.9663 14.8642 19.3916 14.718 18.8109 14.7396C18.2303 14.7611 17.6676 14.9494 17.1878 15.2828M5.84497 18.6198C4.5461 18.7317 3.23969 18.5621 2.01001 18.1221C1.96319 17.5331 2.08119 16.9426 2.35036 16.419C2.61953 15.8954 3.02888 15.4599 3.53107 15.1631C4.03327 14.8662 4.60781 14.72 5.18826 14.7413C5.7687 14.7627 6.33135 14.9508 6.81114 15.2838M15.0759 6.13043C15.0759 6.96067 14.7518 7.75691 14.1747 8.34398C13.5977 8.93105 12.815 9.26086 11.9989 9.26086C11.1829 9.26086 10.4002 8.93105 9.82319 8.34398C9.24614 7.75691 8.92196 6.96067 8.92196 6.13043C8.92196 5.30019 9.24614 4.50395 9.82319 3.91688C10.4002 3.32981 11.1829 3 11.9989 3C12.815 3 13.5977 3.32981 14.1747 3.91688C14.7518 4.50395 15.0759 5.30019 15.0759 6.13043ZM21.2299 9.26086C21.2299 9.56918 21.1702 9.87449 21.0542 10.1593C20.9383 10.4442 20.7683 10.703 20.554 10.921C20.3397 11.139 20.0853 11.312 19.8053 11.43C19.5253 11.548 19.2252 11.6087 18.9222 11.6087C18.6191 11.6087 18.319 11.548 18.039 11.43C17.759 11.312 17.5046 11.139 17.2903 10.921C17.0761 10.703 16.9061 10.4442 16.7901 10.1593C16.6741 9.87449 16.6144 9.56918 16.6144 9.26086C16.6144 8.63818 16.8576 8.041 17.2903 7.6007C17.7231 7.1604 18.3101 6.91304 18.9222 6.91304C19.5342 6.91304 20.1212 7.1604 20.554 7.6007C20.9868 8.041 21.2299 8.63818 21.2299 9.26086ZM7.38346 9.26086C7.38346 9.56918 7.32377 9.87449 7.2078 10.1593C7.09182 10.4442 6.92183 10.703 6.70754 10.921C6.49325 11.139 6.23884 11.312 5.95886 11.43C5.67887 11.548 5.37878 11.6087 5.07572 11.6087C4.77266 11.6087 4.47257 11.548 4.19259 11.43C3.9126 11.312 3.6582 11.139 3.4439 10.921C3.22961 10.703 3.05962 10.4442 2.94365 10.1593C2.82767 9.87449 2.76798 9.56918 2.76798 9.26086C2.76798 8.63818 3.01112 8.041 3.4439 7.6007C3.87669 7.1604 4.46367 6.91304 5.07572 6.91304C5.68777 6.91304 6.27476 7.1604 6.70754 7.6007C7.14033 8.041 7.38346 8.63818 7.38346 9.26086Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```
-transactions
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.1666 14.3889V19.1111C21.1666 20.3267 20.2922 21.3733 19.0866 21.5333C16.7677 21.8411 14.4022 22 12 22C9.59779 22 7.23225 21.8411 4.91338 21.5333C3.70783 21.3733 2.83339 20.3267 2.83339 19.1111V14.3889M21.1666 14.3889C21.4304 14.1596 21.6415 13.8759 21.7854 13.5574C21.9292 13.2388 22.0024 12.8929 21.9999 12.5433V8.34C21.9999 7.13889 21.1466 6.10111 19.9588 5.92333C18.7003 5.73491 17.4354 5.59149 16.1666 5.49333M21.1666 14.3889C20.9511 14.5722 20.6999 14.7167 20.4188 14.8111C17.7035 15.712 14.8609 16.1698 12 16.1667C9.0578 16.1667 6.22781 15.69 3.58116 14.8111C3.30701 14.7199 3.05308 14.5765 2.83339 14.3889M2.83339 14.3889C2.56955 14.1596 2.35846 13.8759 2.21461 13.5574C2.07077 13.2388 1.99758 12.8929 2.00006 12.5433V8.34C2.00006 7.13889 2.85339 6.10111 4.04116 5.92333C5.2997 5.73491 6.56458 5.59148 7.83336 5.49333M16.1666 5.49333V4.5C16.1666 3.83696 15.9032 3.20107 15.4344 2.73223C14.9656 2.26339 14.3297 2 13.6667 2H10.3333C9.67031 2 9.03443 2.26339 8.56559 2.73223C8.09675 3.20107 7.83336 3.83696 7.83336 4.5V5.49333M16.1666 5.49333C13.393 5.27898 10.607 5.27898 7.83336 5.49333M12 12.8333H12.0089V12.8422H12V12.8333Z" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg```
-reports
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.53846 3V14.25C3.53846 14.8467 3.78159 15.419 4.21437 15.841C4.64715 16.2629 5.23412 16.5 5.84615 16.5H8.15385M3.53846 3H2M3.53846 3H20.4615M8.15385 16.5H15.8462M8.15385 16.5L7.12821 19.5M20.4615 3H22M20.4615 3V14.25C20.4615 14.8467 20.2184 15.419 19.7856 15.841C19.3529 16.2629 18.7659 16.5 18.1538 16.5H15.8462M15.8462 16.5L16.8718 19.5M7.12821 19.5H16.8718M7.12821 19.5L6.61538 21M16.8718 19.5L17.3846 21M7.38462 12L10.4615 9L12.6646 11.148C13.6997 9.69929 15.0484 8.48982 16.6154 7.605" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```
-tasks
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6 7.128V6.25C6 5.65326 6.23705 5.08097 6.65901 4.65901C7.08097 4.23705 7.65326 4 8.25 4H15.75C16.3467 4 16.919 4.23705 17.341 4.65901C17.7629 5.08097 18 5.65326 18 6.25V7.128M6 7.128C6.235 7.045 6.487 7 6.75 7H17.25C17.513 7 17.765 7.045 18 7.128M6 7.128C5.56121 7.28313 5.18133 7.57052 4.91269 7.95056C4.64404 8.3306 4.49986 8.7846 4.5 9.25V10.128M18 7.128C18.4388 7.28313 18.8187 7.57052 19.0873 7.95056C19.356 8.3306 19.5001 8.7846 19.5 9.25V10.128M4.5 10.128C4.735 10.045 4.987 10 5.25 10H18.75C19.0055 9.9997 19.2591 10.043 19.5 10.128M4.5 10.128C3.626 10.437 3 11.27 3 12.25V18.25C3 18.8467 3.23705 19.419 3.65901 19.841C4.08097 20.2629 4.65326 20.5 5.25 20.5H18.75C19.3467 20.5 19.919 20.2629 20.341 19.841C20.7629 19.419 21 18.8467 21 18.25V12.25C21.0001 11.7846 20.856 11.3306 20.5873 10.9506C20.3187 10.5705 19.9388 10.2831 19.5 10.128" stroke="#1F2937" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```

-sidebar button to open menu
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H9M9 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H9M9 22V2" stroke="#4B5563" stroke-width="1.5"/>
<path d="M13 7L18 12L13 17" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```
-sidebar button to close menu
```<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22H4C2.89543 22 2 21.1046 2 20V4C2 2.89543 2.89543 2 4 2H9M9 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H9M9 22V2" stroke="#4B5563" stroke-width="1.5"/>
<path d="M18 17L13 12L18 7" stroke="#4B5563" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>```


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

