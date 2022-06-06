/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

it('4.3.1. Создание группы работников', ()=>{

    //

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

    //Открыть пункт меню Заработная плата - Документы - Группы работников  
    cy.get('#topLeft').click();
    cy.wait(5000)
    cy.get('.menuItem ').contains('Заработная плата').click({ force: true })
    cy.wait(5000)
    cy.get('.dx-icon.dx-icon-menu').click()
    cy.wait(5000)
    cy.get('.ng-star-inserted:visible span').contains('Документы').click({force: true})
	cy.wait(10000)
    cy.get('[aria-level="2"]').contains('Группы работников').click()
    cy.wait(3000)
    cy.viewport(1920, 1080)

    
    //нажать [+] 
    cy.get('#BROWSELIST_4B525C0A  [name="addRow"]  .dx-icon').click()
    cy.wait(2000)
    cy.get('.dx-menu-item-text ').contains('Добавить группу работников').click()
    cy.wait(2000)

    //выбрать подразделение для группы 
    cy.get('#DEPARTMENTSTREE_4758CC64').contains('Администрация').click()
    cy.wait(2000)
    //cy.get('#DEPARTMENTSTREE_4758CC64 .dx-row-focused  .dx-checkbox-icon ').click()
    //cy.wait(2000)
    //установить курсор на ФИО сотрудника (первая строка нижней, табличной части)
    cy.get('.dx-row-focused [aria-describedby="dx-col-16"] .ng-star-inserted').click({force: true})
    cy.wait(3000)
    //установить отметку для всех сотрудников подразделения 
    cy.get('#DEPARTMENTACCOUNTSBROWSE_0551B253  [aria-label="Выбрать всё"] .dx-checkbox-icon').click()
    cy.wait(2000)

    cy.get('#Z_LSCHET__PICKB8046E9F [ng-reflect-text="Выбрать"]').click()
    cy.wait(2000)

    cy.get('.modal-footer [aria-label="Отменить"] .dx-button-text').click()
    cy.wait(2000)

    

    //Закрыть справочник до домашней страницы
    cy.get('.action-buttons [aria-label="Закрыть"] .dx-button-text ').click()
    cy.wait(3000)
    
    //Выйти из системы корректно  
    cy.get('.user-panel').click()
    cy.wait(1000)
    cy.get('.dx-submenu').contains('Выход').click()
    cy.wait(6000)

})