/// <reference types="cypress"/>
import "cypress-real-events/support"
import CommandsKP from '../../../support/pageObjects/kp.spec'
import ButtonsKP from '../../../support/pageObjects/kp_buttons.spec'

describe('4.5.1. Формирование удержания', ()=>{

    beforeEach('Вход в систему', ()=>{
        cy.loginWeb()
        CommandsKP.check_window()
        CommandsKP.open_structure('Заработная плата')
    })

    afterEach('Выход из системы', () => {
        cy.logOut()
    })

    it("Реализация этапа", () => {
        CommandsKP.open_page(5000, 'Документы', 'Постоянные удержания')
        ButtonsKP.icon_addRow()
        cy.get(`#idi_SHTRAF_WORKERSTR .dx-button-content`).click()
        cy.wait(5000)
        cy.get('.list-cell').contains('Бухгалтерия').click({ multiple: true })
        cy.wait(5000)
        //! В бухгалтерии даный сотрудник отсутствует
        // cy.get('.list-cell').contains('Разборов Дмитрий Алексеевич').click({ multiple: true })
        // cy.wait(2000)
        // ButtonsKP.btn_choose()

        cy.get('.modal-header .dx-icon-close').last().click()
        cy.wait(3000)
        cy.get('.modal-header .dx-icon-close').last().click()
        cy.wait(3000)
    })
})