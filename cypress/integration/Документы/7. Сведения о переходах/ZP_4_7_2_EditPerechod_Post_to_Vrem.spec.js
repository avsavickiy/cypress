/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

describe('4.7.2 Редактирование перехода', ()=>{

it('4.7.2. Редактирование перехода: перевод постоянного во временный', ()=>{

    //Открыть Систему (логин-пароль) 

    cy.visit('http://test_erp.galaktika.ru/login')
    cy.wait(10000)
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

    // отсортировать столбец Окончание по убыванию 
    cy.get(' [aria-label="Столбец Окончание"]  .dx-datagrid-text-content').click()
    cy.wait(3000)
    cy.get('[aria-rowindex="1"] [aria-colindex="3"]').click()
    cy.wait(3000)

    //нажать кнопку Редактировать
    cy.get('[name="edit"] .dx-button-content ').click()
    cy.wait(3000)

    //установить курсор в поле Окончание и ввести дату 
    cy.get(' #idi_UPPEREXOD_PEREXOD_DATOK  .dx-texteditor-input').type('31122022')
    cy.wait(3000)

    //нажать кнопку Сохранить 
    cy.get('  .modal-footer .action-buttons [aria-label="Сохранить"]').click()
    cy.wait(3000)

    //Закрыть окно редактирования
    cy.get('.modal-header [aria-label="close"]').click()
    cy.wait(3000)

    //Нажать экранную кнопку Закрыть (справочник будет закрыт, открыта домашняя страница)
    cy.get(' [ng-reflect-text="Отменить"] .dx-button-content').click()
    cy.wait(3000)

    //Выйти из Системы корректно 
    cy.get('.user-panel').click()
    cy.wait(1000)
    cy.get('.dx-submenu').contains('Выход').click()
    cy.wait(6000)


})
})