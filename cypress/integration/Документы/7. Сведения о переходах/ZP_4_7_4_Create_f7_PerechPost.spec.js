/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

describe('4.7.4. Создание постоянного пакетного переходов', ()=>{
it('4.7.4. Создание постоянного пакетного переходов', ()=>{

    //Открыть Систему (логин-пароль) 

    cy.visit('http://test_erp.galaktika.ru/login')
    cy.wait(5000)
    cy.get('[type="text"]').type('j')
    cy.get('[type="password"]').type('8')
    cy.get('[type="default"]').click()
    cy.wait(10000)
    cy.get('.dx-item-content').then(($btn) => {
        if ($btn[0].innerText === 'Подтвержение действия') {
            cy.get('[aria-label="Подключиться"]').contains('Подключиться').then((element) => {
                element.trigger("click", { force: true })
                element.trigger("click", { force: true })
            })
        }
    })
    cy.wait(5000)

    //Открыть пункт меню Заработная плата - Документы - Сведения о переходах  
    cy.get('#topLeft').click();
    cy.wait(5000)
    cy.viewport(1920, 1080)
    cy.wait(5000)
    cy.get('.menuItem ').contains('Заработная плата').click({ force: true })
    cy.wait(5000)
    cy.get('.dx-icon.dx-icon-menu').click()
    cy.wait(5000)
    cy.get('.ng-star-inserted:visible span').contains('Документы').click({force: true})
	cy.wait(10000)
    cy.get('[aria-level="2"]').contains('Сведения о переходах').click()
    cy.wait(5000)

    //Создать запись о новом переходе
    cy.get('[name="addRow"] .dx-button-content').click() //нажать на [+]
    cy.wait(3000)

    //Заполнить поля формы: дата Начало, дата Окончание, Подразделение, Категория, 
    //Режим работы, Должность, Система оплаты, ТХО, Параметр (ТХО), Фильтр по ЛС
    
    cy.get('#idi_SCREENPARAMETERS_CHANGEDATE .dx-texteditor-input-container').type('{selectall}{backspace}').type('21042022') //установить дату Начало
    cy.wait(5000)
    cy.get('#idi_SCREENPARAMETERS_RETURNDATE .dx-texteditor-input-container').type('{selectall}{backspace}')//очистить дату Окончание
    cy.wait(5000)
   
    //Заполнение поля Подразделение
    cy.get('#idi_SCREENPARAMETERS_DEPARTMENTQUALIFIEDNAME  .selectbox-field').click() //открыть справочник Подразделений
    cy.wait(5000)
    cy.get('#idi_SCREENPARAMETERS_DEPARTMENTQUALIFIEDNAME  .selectbox-field').click() //открыть справочник Подразделений
    cy.wait(5000)
    cy.get('#DEPTREE_D5FC10ED [ng-reflect-tooltip-value="Применен автофильтр"]').click() //нажать кнопку Фильтр
    cy.get('[aria-colindex="1"]  .dx-texteditor-input').type('Автотранспортный')
    cy.wait(2000)
    cy.contains('Автотрансп').click({force: true})
    cy.wait(2000)
    cy.get('.system-actions_wrapper [aria-label="Выбрать"] .dx-button-content').click()

    //заполнение поля Категория 
    cy.get('#idi_SCREENPARAMETERS_KLKATEGO_NAIKAT .selectbox-field  [aria-label="icon icon-selectbox undefined"]').click() //открыть справочник Категория
    cy.wait(6000)
    cy.get('#TRKLKATEG_FF505CC6 [ng-reflect-tooltip-value="Применен автофильтр"]').click()
    cy.wait(5000)
    cy.get(' .dx-editor-container  [step="1"][aria-label="Фильтр"]').type('3')
    cy.wait(5000)
    cy.contains('Рабочие').click({force: true})  //курсор на строке искомого значения 
    cy.wait(5000)
    cy.get('.system-actions_wrapper [aria-label="Выбрать"] .dx-button-content ').click() //нажать кнопку Выбрать 
    cy.wait(5000)

    //Заполнение поля Режим работы
    cy.get('#idi_SCREENPARAMETERS_KLREJIM_NREJIM .selectbox-field  [aria-label="icon icon-selectbox undefined"]').click() // Открыть справочник Режим работы 
    cy.wait(5000)
    cy.get('#RRR_539E9D4C  [ng-reflect-tooltip-value="Применен автофильтр"]').click() //нажать кнопку Фильтр
    cy.wait(5000)
    cy.get('[aria-colindex="2"]  .dx-texteditor-input-container [aria-label="Фильтр"]').type('5-дневн') //выбрать режим 5-дневная рабочая неделя
    cy.wait(5000)
    cy.get(' .dx-row-focused [aria-colindex="2"]').contains('5-дневная рабочая неделя').dblclick({force: true})
    cy.wait(3000)
   
    //Должность 

    //Система оплаты 

    //ТХО

    //Параметр (ТХО)

    //доп.аналитики 

    //Фильтр по лицевым счетам 
    cy.get('#idi_SCREENPARAMETERS_EMPLOYEEFILTERSTR .selectbox-field [aria-label="icon icon-selectbox undefined"]').click()
    cy.wait(3000)
    cy.get(' #DEPARTMENTSTREE_4758CC64 [aria-label="Выбрать всё"] .dx-checkbox-icon ').click() //выбрать все
    cy.wait(5000)
    cy.get(' #DEPARTMENTSTREE_4758CC64 [aria-label="Выбрать всё"] .dx-checkbox-icon').click() //выбрать все (- снять все пометки)
    cy.wait(3000)
    cy.get('#DEPARTMENTSTREE_4758CC64 [aria-rowindex="1"] ').click({force: true})
    cy.wait(4000)
    cy.get('#DEPARTMENTACCOUNTSBROWSE_0551B253  [aria-label="Выбрать всё"] ').click()
    cy.wait(3000)
    cy.get('#DEPARTMENTACCOUNTSBROWSE_0551B253  [aria-label="Выбрать всё"] ').click()
    cy.wait(3000)

    //нажать кнопку Выбрать (помеченных сотрудников) 
    cy.get(' [aria-label="Выбрать"] .dx-button-text').click()
    cy.wait(3000)

    //
    cy.get('[aria-label="Сформировать"] .dx-button-content ').click()
    cy.wait(3000)

    //
    cy.get('.modal-header [aria-label="close"]').click()
    cy.wait(3000)

    //Нажать экранную кнопку Сохранить
    cy.get(' [ng-reflect-text="Сохранить"] .dx-button-content').click()
    cy.wait(3000)
    
    //Нажать экранную кнопку Отменить (справочник будет закрыт, открыта домашняя страница)
    cy.get(' [ng-reflect-text="Отменить"] .dx-button-content').click()
    cy.wait(3000)

    //Выйти из Системы корректно 
    cy.get('.user-panel').click()
    cy.wait(1000)
    cy.get('.dx-submenu').contains('Выход').click()
    cy.wait(6000)


})
})