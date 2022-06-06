/// <reference types="cypress"/>
import CommandsKP from '../../../support/pageObjects/kp.spec'

it('4.3.2. Редактирование группы работников', ()=>{

    //идет как продолжение 2.3.1, нет проверки на случай если группа пустая (нет таблицы с работниками)

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

    //Сортировка 
    cy.get('#dx-col-3').click()
    cy.wait(2000)
    cy.get('#dx-col-3  .dx-sort').click()
    cy.wait(2000)

    //установить курсор на группу работников 
    cy.get('#BROWSELIST_4B525C0A [aria-rowindex="1"]').dblclick()
    cy.wait(5000)
    //установить курсор на ФИО сотрудника (первая строка нижней, табличной части)
    cy.get('.dx-row-focused [aria-describedby="dx-col-12"] .ng-star-inserted').click({force: true})
    cy.wait(3000)

    //удалить сотрудника из группы 
    cy.get('#BROWSELISTRAB1_F4B62BF0 [name="deleteRows"]').click()
    cy.wait(3000)

    //Согласиться на удаление сотрудника из группы 
    cy.get('[aria-label="Да"] .dx-button-content').click()
    cy.wait(3000)

    //Подтвердить информацию об удалении
    //cy.get(' [aria-label="Да"] .dx-button-content').click()
    //cy.wait(2000)

    //нажать кнопку Обновить табличную часть группы, чтобы убедиться, чт осотрудник из группы удален
    cy.get('#BROWSELISTRAB1_F4B62BF0 [name="refresh"]').click()
    cy.wait(3000)

    //нажать кнопку Закрыть (интерфейс) 
    cy.get('[aria-label="close"] .dx-button-content').click()
    cy.wait(3000)

    //Закрыть справочник до домашней страницы
    cy.get('.action-buttons [aria-label="Закрыть"] .dx-button-text ').click()
    cy.wait(3000)
    
    //Выйти из системы корректно  
    cy.get('.user-panel').click()
    cy.wait(1000)
    cy.get('.dx-submenu').contains('Выход').click()
    cy.wait(6000)

})