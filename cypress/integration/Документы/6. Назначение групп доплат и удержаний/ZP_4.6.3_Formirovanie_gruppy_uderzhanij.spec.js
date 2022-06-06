///<reference types ="Cypress" />

import { BaseCommands } from '../../../support/pageObjects/BaseCommands'

describe('Назначение групп доплат и удержаний', ()=>{

    beforeEach('Вход в систему', ()=>{
//1.Вход на стенд: http://test_erp.galaktika.ru/login 
//2.Ввести регистрационные данные пользователя (логин, пароль)  
    BaseCommands.login('http://test_erp.galaktika.ru/login','savickiy','test')
    })

    afterEach('Выход из системы', () => {
// Выйти из Системы корректно: в правом верхнем углу нажать на ник user, выбрать вариант [Выход]. 
    BaseCommands.exit()
    })

it('Формирование группы удержаний', ()=>{
    cy.viewport(1920, 1080)
//Добавить проверку - если есть сеанс с этим пользователем - нажать кнопку [Продолжить]
    BaseCommands.check_window_log()   
//Проверка коректности входа
    BaseCommands.valid_input()
//В хеддере (верхняя часть страницы) из выпадающего списка выбрать пункт меню Заработная плата (по умолчанию открывается Управление договорами) 
    BaseCommands.modul_name('Заработная плата')
//Открыть интерфейс "Параметры формирования постоянных доплат/удержаний в зарплате и картотеке" через меню Документы- Назначение групп доплат и удержаний. 
    BaseCommands.open_page(3000, 'Документы', 'Назначение групп доплат и удержаний')
//В поле "Группа доплат/удержаний" нажать кнопку выбора - будет открыт интерфейс Выберите группу доплат/удержаний.
    cy.get('.selectbox-field__text-container').first().click({ force: true })
    cy.wait(3000)
//Нажать [+] (Добавить), будет открыт режим редактирования интерфейса
    cy.get('.dx-icon-add').first().click({ force: true })
    cy.wait(3000)
//Заполнить поля:
//Номер и Наименование группы формируются автоматически, по умолчанию. Курсор установлен на новой группе доплат. 
//В нижней части интерфейса нажать [+]. Будет открыт интерфейс Режим добавления в группу. Выбрать вариант  "удержания", нажать экранную кнопку [Продолжить] - будет открыт интерфейс "Выберите виды удержаний"
    cy.get('.dx-icon-add').last().click({ force: true })
    cy.get('.dx-radiobutton').contains("удержания").click()
    cy.get('[aria-label="Продолжить"]').eq(1).click()
//Выбрать коды видов удержаний  150 и  170. Нажать экранную кнопку [Выбрать].
    cy.wait(3000)
    cy.get('[name="filter"]').eq(8).click({force: true})
    cy.get('[aria-label="Фильтр"]').eq(0).click().clear().type('150')
    cy.wait(3000)
    cy.get('[aria-label="Выбрать строку"]').find('.dx-checkbox-icon').eq(0).click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="Выбрать"]').click()
    cy.wait(3000)
//Установить курсор на вид с кодом "150". Нажать кнопку  - строка будет открыта на редактирование. В поле Сумма проставить сумму 15000, нажать кнопку  - внесенные изменения по строке будут сохранены. 
    cy.get('.dx-icon-edit').last().click()
    cy.wait(2000)
    cy.get('.dx-edit-row').find('[aria-colindex="5"]').click().clear().type('15000')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//////////////////////    
    cy.get('.dx-icon-add').last().click({ force: true })
    cy.get('.dx-radiobutton').contains("удержания").click()
    cy.get('[aria-label="Продолжить"]').eq(1).click()
//Выбрать коды видов удержаний  150 и  170. Нажать экранную кнопку [Выбрать].
    cy.wait(3000)
    cy.get('[name="filter"]').eq(8).click({force: true})
    cy.get('[aria-label="Фильтр"]').eq(0).click().clear().type('187')
    cy.wait(3000)
    cy.get('[aria-label="Выбрать строку"]').find('.dx-checkbox-icon').eq(0).click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="Выбрать"]').click()
    cy.wait(3000)
//Установить курсор на вид с кодом 187.   Нажать кнопку  - строка будет открыта на редактирование. В поле Сумма проставить17000, нажать кнопку  - внесенные изменения по строке будут сохранены. 
    cy.get('.dx-icon-edit').last().click()
    cy.wait(2000)
    cy.get('.dx-edit-row').find('[aria-colindex="5"]').click().clear().type('17000')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//В поле Наименование группы заменить значение на "Удержания постоянные", нажать кнопку 
    cy.get('.dx-header-row').eq(2).find('td[aria-colindex="2"]').click().click()
    cy.wait(3000) 
    cy.get('.dx-row-focused').find('.dx-icon-edit').eq(0).click({ force: true })
//////
    cy.get('.dx-edit-row').find('td[aria-colindex="3"]').click().clear().type('Удержания постоянные')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//Выйти из режима редактирования интерфейса Выберите группу доплат/удержаний. 
    cy.get('[aria-label="Закрыть"]').eq(1).click()
    cy.wait(3000)   
//В поле "Группа доплат/удержаний" выбрать созданную группу удержаний (Удержания постоянные). 
//Проверить выбор группы удержаний в поле - еще раз нажать выбор, найти группу Удержания постоянные - выбрать группу. 
    cy.get('[ng-reflect-value="Удержания постоянные"]').dblclick()
    cy.wait(4000)
//Заполнить поля:
//Дата назначения 11.04.2022 
    cy.get('.component-container').contains(' Дата назначения ').parent().parent().find('.flex-input').type('11.04.2022')
//Дата начала 11.04.2022 
    cy.get('.component-container').contains(' Дата начала ').parent().parent().find('.flex-input').type('11.04.2022')
//Дата окончания 03.05.2022 
    cy.get('.component-container').contains(' Дата окончания ').parent().parent().find('.flex-input').type('03.05.2022') 
//Подразделение Администрация
    cy.get('.component-container').contains(' Подразделение ').parent().parent().find('[ng-reflect-ng-switch="SelectBox"]').click()
    cy.get('[name="filter"] .icon-selective').click({force: true})
    cy.wait(1000)
    cy.get('.dx-texteditor-input').last().type('Администрация')
    cy.get('.dx-row').contains('Администрация').dblclick()
    cy.wait(2000)   
//Фильтр по работникам Бровкина В. Ю.
    cy.get('.dx-checkbox').eq(1).click()
    cy.wait(1000)
    cy.get('.dx-checkbox').eq(1).click()     
    cy.wait(3000)
    cy.get('[name="filter"] .icon-selective').click({force: true})
    cy.wait(1000)
    cy.get('.dx-texteditor-input').last().type('Бровкина')
    cy.wait(2000)
    cy.get('.dx-row').contains('Бровкина').dblclick()
    cy.wait(2000)
    cy.get('[ng-reflect-text="Выбрать"]').click()
    cy.wait(2000)    
//Добавить в "зарплату"
    cy.get('.dx-checkbox').eq(2).click()
//Нажать "Продолжить". Выполнить формирование (будет отображен интерфейс с информацией о выполнении формирования - нажать [ОК], далее - формирование завершено - нажать [ОК])
    cy.get('[ng-reflect-text="Продолжить"]').click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="ОК"]').click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="ОК"]').click()
    cy.wait(2000)
    cy.get('[ng-reflect-text="Отмена"]').click()

//Зайти в Лицевой счет  Бровкина В.Ю., проверить наличие двух видов удержаний (150 и 170. Для этого: 
//Открыть пункт меню Заработная плата - Документы- Лицевые счета
    BaseCommands.open_page(3000, 'Документы', 'Лицевые счета')
//Найти сотрудника Бровкина В.Ю. - установить на ФИО курсор 
    cy.get('[ng-reflect-value="Бровкина Валентина Юрьевна"]').click() 
//В верхней части интерфейса, в панели инструментов (кнопок) нажать   и найти коды 150 и 170 (убедиться, что они присутствуют) . 
    cy.get('[data-value="Постоянные удержания"]').click()   
    cy.wait(3000)
    cy.get('[ng-reflect-value="удержание подотчетных сумм"]')
    cy.get('[ng-reflect-value="Удержания алиментов в банк"]')
//Нажать экранную кнопку [Отменить], будет открыт на экране перечень лицевых счетов
    cy.get('[ng-reflect-text="Отменить"]').eq(1).click()  
    cy.wait(3000)
//Нажать экранную кнопку [Отменить], будет открыта домашняя страница
    cy.get('[ng-reflect-text="Отменить"]').click()  
    cy.wait(3000)
//Выйти из Системы корректно: в правом верхнем углу нажать на ник user, выбрать вариант [Выход].

    })
})