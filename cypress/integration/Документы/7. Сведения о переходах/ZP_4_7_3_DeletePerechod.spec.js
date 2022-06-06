/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

describe('4.7.3. Удаление созданных переходов', ()=>{
it('4.7.3. Удаление созданных переходов', ()=>{

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

    //Найти созданный в п.2.7.4 переход, установить курсор на запись 
    //1.нажать экранную кнопку "фильтр"
    cy.get('[name="filter"]  .dx-icon-filter ').click()
    cy.wait(5000)
    //ввести в поле поиска номер счета 
    cy.get('[aria-colindex="3"] .dx-texteditor-input').type('Авдеев') //здесь должен быть номер, созданный в п.2.4.7
    cy.contains('Авдеев').click()
    cy.wait(3000)
    cy.get('.dx-row-focused .dx-checkbox-container').click() //установить пометку строки
    cy.wait(3000)

    //Удалить запись (включить отметку и нажать кнопку Удалить)
    cy.get('[name="deleteRows"]  .dx-button-content').click()
    cy.wait(3000)

    //Подтвердить удаление
    //cy.get('  [aria-label="Удалить"] .dx-button-content').click()
    //cy.wait(3000)
    cy.get(' [aria-label="Да"] .dx-button-content').click()
    cy.wait(3000)

    //Нажать экранную кнопку Сохранить (справочник будет закрыт, открыта домашняя страница)
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