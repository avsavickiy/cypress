/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

it('4.3.3. Удаление группы работников', ()=>{

    //идет как продолжение общего пункта 2.3 

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
    cy.wait(7000)

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

    //снять все пометки 
    cy.get('.dx-datagrid-headers  .dx-command-select  .dx-checkbox-icon').click()
    cy.wait(1000)
    cy.get('.dx-datagrid-headers  .dx-command-select  .dx-checkbox-icon').click()
    cy.wait(1000)
    cy.get('.dx-row-focused .dx-checkbox-icon').click()
    cy.wait(2000)
    cy.get('.dx-row-focused .dx-checkbox-icon').click()
    cy.wait(2000)

    //Сортировка 
    cy.get('#dx-col-3').click()
    cy.wait(1000)
    cy.get('#dx-col-3  .dx-sort').click()
    cy.wait(1000)
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="2"] .dx-checkbox-icon').click()
    cy.wait(2000)
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="2"] .dx-checkbox-icon').click()
    cy.wait(2000)
    
    
    //установить курсор на первую в списке Группу работников 
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="1"]').click()
    cy.wait(5000)
    
    //установить отметку выбора (Insert)
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="1"] .dx-checkbox-icon').click()
    cy.wait(2000)
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="1"] .dx-checkbox-icon').click()
    cy.wait(2000)
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="1"] .dx-checkbox-icon').click()
    cy.wait(2000)

    //Нажать кнопку Удалить группу работников 
    cy.get('#BROWSELIST_4B525C0A  [name="deleteRows"] .dx-button-content').click()
    cy.wait(2000)

    //Подтвердить удаление группы работников 
    cy.get(' [aria-label="Да"]  .dx-button-content .dx-button-text ').click()
    cy.wait(2000)

    //Подтвердить Информацию об удалении (второй вопрос - точно-точно удалить?) 
    //cy.get('[aria-label="Да"] .dx-button-content .dx-button-text').click()
    //cy.wait(2000)

    //Закрыть справочник до домашней страницы
    cy.get('.action-buttons [aria-label="Закрыть"] .dx-button-text ').click()
    cy.wait(3000)
    
    //Выйти из системы корректно  
    cy.get('.user-panel').click()
    cy.wait(1000)
    cy.get('.dx-submenu').contains('Выход').click()
    cy.wait(6000)

})