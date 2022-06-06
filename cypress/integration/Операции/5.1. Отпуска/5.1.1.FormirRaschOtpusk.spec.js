/// <reference types="cypress"/>
import "cypress-real-events/support"
import CommandsKP from '../../../support/pageObjects/kp.spec'
import ButtonsKP from '../../../support/pageObjects/kp_buttons.spec'

describe('5.1.1. Формирование и расчет отпуска с МП и удержаний с отпускных (расчет с выплатой на руки через кассу и на карточку)', ()=>{

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
        ButtonsKP.btn_toolbar('Формирование отпусков [F7]')

        cy.log('Выбор пакета отпуска')
        cy.get(`#idi_FORMPAROTP_FILTROTPUSK .dx-button-content`).then((element) => {
            element.trigger("click", { force: true })
            element.trigger("click", { force: true })
        })
        cy.wait(4000)
        cy.contains('Выбор вида отпуска').parents('.modal-content').find('.dx-row').contains('Ежегодный очередной отпуск').click()
        ButtonsKP.btn_choose()
        cy.wait(2000)

        cy.log('Значения по умолчанию для заполнения суммы на руки')
        cy.get('#idi_FORMPAROTP_SUMNARUK_sources').click()
        cy.wait(2000)
        cy.get('.dx-item-content').contains(/^\s*выплачивать\s*$/).click()
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
                console.log($chbx[0].value)
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
        cy.get('[aria-rowindex="1"] [role="checkbox"]').last().click()
        cy.get('[aria-rowindex="2"] [role="checkbox"]').last().click()
        cy.wait(1000)
        ButtonsKP.btn_choose()
        ButtonsKP.btn_form()
        cy.contains(/^\s*Отпуска формируемого пакета\s*$/).parents('.modal-content').find('[aria-rowindex="1"] [aria-label="Редактировать"]').last().click()
        cy.get('[aria-rowindex="1"] [aria-colindex="4"] .dx-texteditor-input').type('{selectall}{backspace}').type('{selectall}{backspace}').type('20')
        cy.get('[aria-label="Сохранить"]').last().click()
        cy.get('[aria-label="Нет"]').click()
        cy.wait(2000)
        cy.get('.modal-content [aria-rowindex="2"] [aria-label="Редактировать"]').click()
        cy.get('[aria-rowindex="2"] [aria-colindex="4"] .dx-texteditor-input').type('{selectall}{backspace}').type('6')
        cy.get('[aria-label="Сохранить"]').last().click()
        cy.get('[aria-label="Нет"]').click()
        ButtonsKP.btn_choose()

        cy.log('9. Проверка наличия созданных отпусков')
        CommandsKP.td_check(' 08.02.2021 ', ' 06.03.2021 ')
        
        cy.log('10. Расчет отпуска таб.№ 501')
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).click()
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).dblclick({force: true})
        cy.wait(5000)
        cy.get('.dx-texteditor-input:nth(1)').rightclick()
        cy.get('.dx-menu-item-text').contains('Расчет отпускных и удержаний').click()
        cy.wait(5000)

        cy.log('11. В открывшемся окне Параметры расчета проверить заполнение настроек.')
        // CommandsKP.check_input({name_id: 'i_FORMPAROTP_RF_FILTROTPUSK', item: 'Все отпуска'})
        // cy.get('.dx-item-content').contains(/^\s*помеченных отпусков\s*$/).click()
        // cy.get('.dx-item-content').contains(/^\s*Параметры расчета отпуска\s*$/).click()
        // cy.wait(2000)
        cy.get('.dx-item-content').contains(/^\s*Календарным\s*$/).click()
        cy.wait(2000)
        cy.get('.dx-item-content').contains('По архиву оплат').click({force: true})

        cy.log('12. Нажать экранную кнопку [Расчет].')
        cy.get('[aria-label="Расчет"]').click()
        cy.wait(2000)

        cy.log('13. В окне Выбора отчета пометить Полная форма распечатки расчета.')
        cy.get('.list-cell').contains(/^\s*Полная форма распечатки расчета\s*$/).parents('.dx-data-row').find('.dx-select-checkbox').click()

        cy.log('14. Нажать Сформировать.')
        ButtonsKP.btn_form()
        cy.get('.modal-header .dx-icon-close').click()
        cy.wait(3000)

        cy.log('15. При расчете должны быть заполнены поля:  Итого, Налог на доходы, На руки.')
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-11"]').should('not.be.empty')
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-12"]').should('not.be.empty')
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-13"]').should('not.be.empty')
        cy.log('Снятие чекбокса с Легковушкин Леонид Леонидович.')
        cy.get('.list-cell').contains(/^\s*Легковушкин Леонид Леонидович\s*$/).parents('.dx-data-row').find('.dx-select-checkbox').click()

        cy.log('16. Двойным щелчком открыть отпуск на редактирование.')
        cy.get('.list-cell').contains(/^\s*Грузовичков Геннадий Геннадьевич\s*$/).dblclick()
        cy.wait(2000)

        cy.log('17. Нажать правую кнопку мыши, выбрать пункт меню Расчет отпускных и удержаний.')
        cy.get('.modal-body').rightclick()
        cy.get('.dx-menu-item-text').contains('Расчет отпускных и удержаний').click()
        cy.wait(2000)

        cy.log('18. В открывшемся окне Параметры расчета проверить заполнение настроек.')
        cy.get('.dx-item-content').contains(/^\s*Фактическим\s*$/).click()
        cy.get('.dx-item-content').contains(/^\s*По архиву оплат\s*$/).click()

        cy.log('19. Нажать экранную кнопку [Расчет] и выбор отчета Полная форма распечатки расчета')
        cy.get('[aria-label="Расчет"]').click()
        cy.wait(2000)
        cy.get('.list-cell').contains(/^\s*Полная форма распечатки расчета\s*$/).parents('.dx-data-row').find('.dx-select-checkbox').click()
        ButtonsKP.btn_form()

        cy.log('20. При расчете должны быть заполнены поля:  Итого, Налог на доходы, На руки.')
        cy.get('.list-cell').contains(/^\s*Грузовичков Геннадий Геннадьевич\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-11"]').should('not.be.empty')
        cy.get('.list-cell').contains(/^\s*Грузовичков Геннадий Геннадьевич\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-12"]').should('not.be.empty')
        cy.get('.list-cell').contains(/^\s*Грузовичков Геннадий Геннадьевич\s*$/).parents('.dx-data-row').find('[aria-describedby="dx-col-13"]').should('not.be.empty')

        //? костылёк
        // cy.get('.list-cell').contains(/^\s*Грузовичков Геннадий Геннадьевич\s*$/).dblclick()
        cy.wait(5000)

        cy.log('22. Проверить заполнение полей.')
        cy.get('.dx-template-wrapper').contains(/^\s*1, Основной отпуск\s*$/).parents('.dx-data-row').find('[aria-colindex="9"]').should('have.text', '44368.6')
        cy.get('.dx-template-wrapper').contains(/^\s*1, Основной отпуск\s*$/).parents('.dx-data-row').find('[aria-colindex="10"]').should('have.text', '38600.76')
        cy.get('.dx-template-wrapper').contains(/^\s*12, Дополнительный отпуск \(к ежегодному\)\s*$/).parents('.dx-data-row').find('[aria-colindex="9"]').should('have.text', '13310.58')
        cy.get('.dx-template-wrapper').contains(/^\s*12, Дополнительный отпуск \(к ежегодному\)\s*$/).parents('.dx-data-row').find('[aria-colindex="10"]').should('have.text', '11580.28')
        cy.get('.dx-template-wrapper').contains(/^\s*из ФЗП\s*$/).parents('.dx-data-row').find('[aria-colindex="3"]').should('have.text', '2218.43')

        cy.log('23. Изменить код Вида удержания и дату выплаты.')
        cy.get('#idi_SCRRIGHT_OTPOPL_KVIDUD .dx-button-content').last().click()
        cy.wait(3000)
        cy.get('[name="filter"] .icon-selective').last().click()
        cy.get('#idcommon_filter_BRKIND_0_0 .dx-texteditor-input').type(202)
        cy.wait(2000)
        cy.get('.ng-star-inserted').contains(/^\s*Перечисление на карту в межпериод\s*$/).dblclick()
        cy.wait(3000)

        cy.log('24. Нажать экранную кнопку [Сохранить и закрыть].')
        ButtonsKP.btn_save_and_close()
        cy.document().should('not.include.text', /^\s*Отпуска \(отчетные, все подразделения\)\s*$/)

        cy.log('25. Нажать экранную кнопку [Закрыть].')
        ButtonsKP.btn_close()
        cy.document().should('not.include.text', /^\s*Отпуска \(отчетный, все подразделения\) помечено: 0\s*$/)

        cy.get('.modal-header .dx-icon-close').click()
        cy.wait(3000)
    })
})