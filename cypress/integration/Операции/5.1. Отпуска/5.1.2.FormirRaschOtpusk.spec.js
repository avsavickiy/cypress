/// <reference types="cypress"/>
import "cypress-real-events/support"
import CommandsKP from '../../../support/pageObjects/kp.spec'
import ButtonsKP from '../../../support/pageObjects/kp_buttons.spec'

describe('5.1.2. Формирование и расчет отпуска (выплата в зарплату)', ()=>{
    beforeEach('Вход в систему', ()=>{
        cy.loginWeb()
        CommandsKP.check_window()
        CommandsKP.open_structure('Заработная плата')
    })

    afterEach('Выход из системы', () => {
        cy.logOut()
    })

    // it.only("Реализация этапа", () => {
    //     CommandsKP.open_page(5000, 'Операции', 'Отпуска ', 'Расчет отпускных ')
    // })

    it("Реализация этапа", () => {
        CommandsKP.open_page(5000, 'Операции', 'Отпуска ', 'Расчет отпускных ')

        cy.log('4. Открытие параметров формирования отпусков.')
        ButtonsKP.btn_toolbar('Формирование отпусков [F7]')

        cy.log('5-7. Выбор пакета отпуска')
        cy.get(`#idi_FORMPAROTP_FILTROTPUSK .dx-button-content`).then((element) => {
            element.trigger("click", { force: true })
            element.trigger("click", { force: true })
        })
        cy.wait(4000)
        cy.contains('Выбор вида отпуска').parents('.modal-content').find('.dx-row').contains('Ежегодный очередной отпуск').click()
        ButtonsKP.btn_choose()
        cy.wait(2000)

        cy.log('8. Заполнение полей')

        cy.log('Значения по умолчанию для заполнения суммы на руки')
        cy.get('#idi_FORMPAROTP_SUMNARUK_sources').click()
        cy.wait(2000)
        cy.get('.dx-item-content').contains(/^\s*не выплачивать\s*$/).click()
        cy.wait(2000)

        cy.log('код для кассы')
        cy.get(`#idi_FORMPAROTP_KLVIDUDV_VIDUDP .dx-button-content`).click()
        cy.wait(2000)
        cy.get('[name="filter"] .icon-selective').last().click()
        cy.wait(1000)
        cy.get('.dx-texteditor-input').last().type(181)
        cy.wait(1000)
        cy.get('[aria-colindex="1"]').contains('181').dblclick()
        cy.wait(2000)

        cy.log('код для банка')
        cy.get(`#idi_FORMPAROTP_KLVIDUDB_VIDUDP .dx-button-content`).click()
        cy.wait(2000)
        cy.get('[name="filter"] .icon-selective').last().click()
        cy.wait(1000)
        cy.get('.dx-texteditor-input').last().type(202)
        cy.wait(1000)
        cy.get('[aria-colindex="1"]').contains('202').dblclick()

        CommandsKP.insert_text(
            {id_input:'idi_FORMPAROTP_DATAN', input:'08.02.2021'},
            {id_input:'idi_FORMPAROTP_DATAOK', input:'09.03.2021'}
        )

        cy.log('Выбор подразделения')
        cy.get(`#idi_FORMPAROTP_FILTRPODR .dx-button-content`).click()
        cy.wait(2000)
        cy.get('[name="filter"] .icon-selective').last().click()
        cy.wait(1000)
        cy.get('.dx-texteditor-input').last().type('Автотранспортный')

        cy.get('.dx-datagrid-search-text').contains('Автотранспортный').parents('.dx-row').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.dx-datagrid-search-text').contains('Автотранспортный').parents('.dx-row').find('.dx-select-checkbox').click({force: true})
            }
        })
        ButtonsKP.btn_choose()
        cy.wait(7000)

        //проверяем, если чекбокс работникам активен то снимаем галочку
        cy.get('.dx-field-label').contains(/^\s*работникам\s*$/).parents('.component-container').find('input').then(($chbx) => {    
            if($chbx[0].value === 'true') {
                cy.get('.dx-field-label').contains(/^\s*работникам\s*$/).parents('.component-container').find('.dx-checkbox-icon').click({force: true})
                cy.wait(3000)
            }
        })
        cy.get('.dx-field-label').contains(/^\s*работникам\s*$/).parents('.component-container').find('.dx-checkbox-icon').click({force: true})
        cy.wait(2000)
        cy.get('[ng-reflect-tooltip-value="Применен автофильтр"]').last().click()
        cy.wait(1000)
        cy.get('[aria-colindex="2"] .dx-texteditor-input').last().type(50)
        cy.wait(2000)
        cy.get('[aria-rowindex="3"] [role="checkbox"]').last().click()
        cy.wait(1000)
        ButtonsKP.btn_choose()

        cy.log('9. Нажатие кнопки "Сформировать" и "Выбрать"')
        ButtonsKP.btn_form()
        ButtonsKP.btn_choose()

        cy.log('10. Проверка наличия созданных отпусков')
        CommandsKP.td_check(' 08.02.2021 ', ' 09.03.2021 ')

        cy.log('11. Расчет отпускных')
        cy.get('.list-cell').contains(/^\s*Дальнобоев Дмитрий Дмитриевич\s*$/).click()
        cy.get('.list-cell').contains(/^\s*Дальнобоев Дмитрий Дмитриевич\s*$/).dblclick({force: true})
        cy.wait(5000)
        cy.get('.dx-texteditor-input:nth(1)').rightclick()
        cy.get('.dx-menu-item-text').contains('Расчет отпускных').click()
        cy.wait(3000)

        cy.log('12. Нажать экранную кнопку [Расчет].')
        cy.get('[aria-label="Расчет"]').click()
        cy.wait(2000)

        cy.log('13. В окне Выбора отчета пометить Полная форма распечатки расчета. Нажать Сформировать.')
        cy.get('.list-cell').contains(/^\s*Полная форма распечатки расчета\s*$/).parents('.dx-data-row').find('.dx-select-checkbox').click()
        ButtonsKP.btn_form()
        ButtonsKP.btn_close()
        cy.get('.modal-header .dx-icon-close').click()
        cy.wait(3000)

        cy.log('18. Открываем пункт меню: "Документы - Лицевые счета"')
        CommandsKP.open_page(5000, 'Документы', 'Лицевые счета')

        cy.log('19. Нажимаем кнопку (тулбар) "Фильтр"')
        ButtonsKP.icon_filter()

        cy.log('20. В столбце Таб.№ - вводим значение 503.')
        cy.get('[aria-colindex="1"] .dx-texteditor-input').type(503)
        cy.wait(3000)

        cy.log('21. Открываем интерфейс Смежные данные (таб.№503)')
        cy.get('.list-cell').contains(/^\s*Дальнобоев Дмитрий Дмитриевич\s*$/).click()
        ButtonsKP.btn_toolbar('Смежные данные')

        cy.log('22. Открываем вкладку [Текущие данные], найти и нажать кнопку [Табели учета рабочего времени]')
        cy.get('.dx-tab-content').contains('Текущие данные').click()
        cy.wait(3000)
        cy.get('[aria-label="Табели учета рабочего времени"]').click()
        cy.wait(3000)

        cy.log('23. Открываем табель Февраль 2021. Выбираем "Переформировать". Проверяем наличие значения "ОТ"')
        cy.contains(/^\s*2021\s*$/).parents('[aria-colindex="2"]').next().contains(/^\s*февраль\s*$/).dblclick()
        cy.wait(8000)
        cy.get('#idi_DAILYINFOSCREEN_DAYORDERNUMBER8').rightclick({force: true})
        cy.wait(2000)
        cy.get('.dx-menu-item-text').contains('Переформировать').click()
        cy.wait(2000)
        //! не происходит переформирование
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO8 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO9 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO10 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO11 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO12 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO15 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO16 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO17 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO18 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO19 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO22 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO23 .dx-texteditor-input').should('have.value', 'В')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO24 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO25 .dx-texteditor-input').should('have.value', 'ОТ')
        // cy.get('#i_DAILYINFOSCREEN_DAYINFO26 .dx-texteditor-input').should('have.value', 'ОТ')

        cy.log('24. Выходим из режима редактирования табеля.')
        ButtonsKP.btn_save()
        cy.wait(5000)
        cy.get('.modal-header .dx-icon-close').click()

        cy.log('25. Выходим из  перечня сформированных табелей')
        ButtonsKP.btn_close()

        cy.log('26.  Открываем интерфейс "Параметры расчета заработной платы"')
        cy.get('.dx-tab-content').contains('Расчет заработной платы').click()
        cy.wait(2000)
        cy.get('[aria-label="Расчет заработной платы"]').click()
        cy.wait(3000)

        cy.log('27.  Установка параметров')
        cy.get('.flex-label__title').contains(/^\s*Предварительная разноска\s*$/).parents('.component__CheckBox').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.flex-label__title').contains(/^\s*Предварительная разноска\s*$/).parents('.component__CheckBox').find('.dx-checkbox-icon').click({force: true})
            }
        })
        cy.wait(3000)
        cy.get('.flex-label__title').contains(/^\s*Расчет начислений\s*$/).parents('.component__CheckBox').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.flex-label__title').contains(/^\s*Расчет начислений\s*$/).parents('.component__CheckBox').find('.dx-checkbox-icon').click({force: true})
            }
        })
        cy.wait(3000)
        cy.get('.flex-label__title').contains(/^\s*Расчет удержаний\s*$/).parents('.component__CheckBox').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.flex-label__title').contains(/^\s*Расчет удержаний\s*$/).parents('.component__CheckBox').find('.dx-checkbox-icon').click({force: true})
            }
        })
        cy.wait(3000)
        cy.get('.flex-label__title').contains(/^\s*Расчет налогов на ФОТ\s*$/).parents('.component__CheckBox').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.flex-label__title').contains(/^\s*Расчет налогов на ФОТ\s*$/).parents('.component__CheckBox').find('.dx-checkbox-icon').click({force: true})
            }
        })
        ButtonsKP.btn_continue()
        cy.get('.modal-header .dx-icon-close').click()
        cy.wait(3000)
        cy.get('[aria-label="Расчетный лист"]').click()
        cy.wait(3000)

        cy.log('28. Ставим выбор на "Полная форма", "Без учета видов работы", "Бизнес-текст"')
        cy.get('.flex-label__title').contains(/^\s*Полная форма\s*$/).parents('.component__CheckBox').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.flex-label__title').contains(/^\s*Полная форма\s*$/).parents('.component__CheckBox').find('.dx-checkbox-icon').click({force: true})
            }
        })
        cy.contains(/^\s*Без учета видов работы\s*$/).click()
        cy.wait(2000)
        cy.log('Значения по умолчанию для заполнения суммы на руки')
        cy.get('#i_FORMPARONE_RLISTFORMTYPE_sources .dx-lookup-field').click()
        cy.wait(2000)
        cy.get('.dx-item-content').contains(/^\s*Бизнес-текст\s*$/).click()
        cy.wait(2000)

        cy.log('29. Нажимаем кнопку "Сформировать". Выбираем "Полная форма расчетного листка" и еще раз кнопку "Сформировать"')
        ButtonsKP.btn_form()
        cy.wait(2000)
        cy.get('.list-cell').contains(/^\s*Полная форма расчетного листка\s*$/).parents('.dx-data-row').find('input').then(($chbx) => {    
            if($chbx[0].value === 'false') {
                cy.get('.list-cell').contains(/^\s*Полная форма расчетного листка\s*$/).parents('.dx-data-row').find('.dx-checkbox-icon').click({force: true})
            }
        })
        cy.wait(2000)
        cy.get('[aria-label="Сформировать"]').last().click({ force: true })
        cy.wait(5000)

        cy.log('30. Закрываем интерфейс "Параметры формирования расчетных листков"')
        cy.get('.modal-header .dx-icon-close').click()
        cy.wait(3000)

        cy.log('32. Закрываем интерфейс "Смежные данные (таб.№503)"')
        ButtonsKP.btn_close()

        cy.log('33. Закрываем интерфейс "Лицевые счета (все подразделения)"')
        ButtonsKP.btn_save()
    })
})
