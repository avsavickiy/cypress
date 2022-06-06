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


it('Формирование группы доплат', ()=>{
    cy.viewport(1920, 1080)
//Добавить проверку - если есть сеанс с этим пользователем - нажать кнопку [Продолжить]
    BaseCommands.check_window_log()   
//Проверка коректности входа
    BaseCommands.valid_input()
//В хеддере (верхняя часть страницы) из выпадающего списка выбрать пункт меню Заработная плата (по умолчанию открывается Управление договорами) 
    BaseCommands.modul_name('Заработная плата')
//Открыть интерфейс "Параметры формирования постоянных доплат/удержаний в зарплате и картотеке" через меню Заработная плата -  Документы- Назначение групп доплат и удержаний.
    BaseCommands.open_page(3000, 'Документы', 'Назначение групп доплат и удержаний')
//В поле "Группа доплат/удержаний"  нажать кнопку выбора, будет открыт интерфейс Выберите группу доплат/удержаний
    cy.get('.selectbox-field__text-container').first().click({ force: true })
    //cy.get('.selectbox-field__text-container').parents('Группа доплат/удержаний').contains().click({ force: true })
    cy.wait(3000)
//Нажать [+] (Добавить) - будет открыт режим редактирования интерфейса
    cy.get('.dx-icon-add').first().click({ force: true })
    cy.wait(3000)
//Заполнить поля:
//Номер и Наименование группы формируются автоматически, по умолчанию. Курсор установлен на новой группе доплат. 
    //cy.get('.dx-data-row').click({ force: true })
//В нижней части интерфейса нажать [+]. Будет открыт интерфейс Режим добавления в группу. Выбрать вариант  "доплат", нажать экранную кнопку [Продолжить] - будет открыт интерфейс "Выберите виды оплат"
    cy.get('.dx-icon-add').last().click({ force: true })
    cy.get('.dx-radiobutton').contains("доплаты").click()
    cy.get('[aria-label="Продолжить"]').eq(1).click()
//Выбрать (установить отметку [v] ) для видов оплат -  ВО 1 и ВО 86. Нажать экранную кнопку [Выбрать]. Доплаты будут перенесены в табличную нижнюю часть интерфейса Редактирование типовых групп доплат/удержаний.
    cy.wait(3000)
    cy.get('[name="filter"]').eq(8).click({force: true})
    cy.get('[aria-label="Фильтр"]').eq(0).click().clear().type('1')
    cy.wait(3000)
    cy.get('[aria-label="Выбрать строку"]').find('.dx-checkbox-icon').eq(0).click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="Выбрать"]').click()
    cy.wait(3000)
//Установить курсор на Вид оплаты с кодом "1". Нажать кнопку  - строка будет открыта на редактирование. В поле Сумма проставить сумму 10000, нажать кнопку  - внесенные изменения по строке будут сохранены.   
    cy.get('.dx-icon-edit').last().click()
    cy.wait(2000)
    cy.get('.dx-edit-row').find('[aria-colindex="5"]').click().clear().type('10000')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//////////////////////    
    cy.get('.dx-icon-add').last().click({ force: true })
    cy.get('.dx-radiobutton').contains("доплаты").click()
    cy.get('[aria-label="Продолжить"]').eq(1).click()
//Выбрать (установить отметку [v] ) для видов оплат -  ВО 1 и ВО 86. Нажать экранную кнопку [Выбрать]. Доплаты будут перенесены в табличную нижнюю часть интерфейса Редактирование типовых групп доплат/удержаний.
    cy.wait(3000)
    cy.get('[name="filter"]').eq(8).click({force: true})
    cy.get('[aria-label="Фильтр"]').eq(0).click().clear().type('86')
    cy.wait(3000)
    cy.get('[aria-label="Выбрать строку"]').find('.dx-checkbox-icon').eq(0).click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="Выбрать"]').click()
    cy.wait(3000)
//Установить курсор на Вид оплаты с кодом 86.   Нажать кнопку  - строка будет открыта на редактирование. В поле Процент  проставить процент 10, нажать кнопку  - внесенные изменения по строке будут сохранены. 
    cy.get('.dx-icon-edit').last().click()
    cy.wait(2000)
    cy.get('.dx-edit-row').find('[aria-colindex="6"]').click().clear().type('10')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//Установить курсор на наименование группы - в верхней табличной части и нажать . Строка с кодом и наименованием группы будет открыта на редактирование. 
    cy.get('.dx-header-row').eq(2).find('td[aria-colindex="2"]').click().click()
    cy.wait(3000) 
    cy.get('.dx-row-focused').find('.dx-icon-edit').eq(0).click({ force: true })
//В поле Наименование группы заменить значение на "Доплаты постоянные", нажать кнопку 
    cy.get('.dx-edit-row').find('td[aria-colindex="3"]').click().clear().type('Доплаты постоянные')
    cy.get('[title="Сохранить"]').click({ force: true }) 
    cy.wait(1000) 
//Нажать экранную кнопку [Закрыть] в нижнем правом углу интерфейса, чтобы выйти из режима редактирования интерфейса. Будет открыт интерфейс  Выберите группу доплат/удержаний. 
    cy.get('[aria-label="Закрыть"]').eq(1).click()
    cy.wait(3000)    
//Установить курсор на наименование группы "Доплаты постоянные" и двойным щелчком левой кнопки мыши выбрать это значение. Значение будет перенесено в поле Группа доплат/удержаний в интерфейсе Параметры формирования постоянных  доплат/удержаний в зарплате и картотеке 
    cy.get('[ng-reflect-value="Доплаты постоянные"]').dblclick()
    cy.wait(4000)
//Далее заполнить поля: 
//Дата назначения 01.02.2021 
    cy.get('.component-container').contains(' Дата назначения ').parent().parent().find('.flex-input').type('01.02.2021')
//Дата начала 01.02.2021 
    cy.get('.component-container').contains(' Дата начала ').parent().parent().find('.flex-input').type('01.02.2021')
//Дата окончания 31.03.2021 
    cy.get('.component-container').contains(' Дата окончания ').parent().parent().find('.flex-input').type('31.03.2021')
//Подразделение Администрация
    cy.get('.component-container').contains(' Подразделение ').parent().parent().find('[ng-reflect-ng-switch="SelectBox"]').click()
	cy.get('[name="filter"] .icon-selective').click({force: true})
    cy.wait(1000)
    cy.get('.dx-texteditor-input').last().type('Администрация')
    cy.get('.dx-row').contains('Администрация').dblclick()
    cy.wait(2000)
//Фильтр по работникам Бровкина В. Ю.

//     if (cy.get('.dx-checkbox').eq(1).should('ng-reflect-value="false"')) {
//         cy.get('.dx-checkbox').eq(1).click()
//         }
//     else {
//         cy.get('.dx-checkbox').eq(1).click()
//         cy.wait(1000)
//         cy.get('.dx-checkbox').eq(1).click()
//          }
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
//Нажать "Продолжить". Выполнить формирование.
    cy.get('[ng-reflect-text="Продолжить"]').click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="ОК"]').click()
    cy.wait(3000)
    cy.get('[ng-reflect-text="ОК"]').click()
    cy.wait(2000)
    cy.get('[ng-reflect-text="Отмена"]').click()
//выйти из интерфейса формирования группы доплат - нажать гиперссылку Главная в верхнем левом углу интерфейса. 
//Открыть пункт меню Заработная плата - Документы- Лицевые счета
    BaseCommands.open_page(3000, 'Документы', 'Лицевые счета')
//Найти сотрудника Бровкина В.Ю. - установить на ФИО курсор
    cy.get('[ng-reflect-value="Бровкина Валентина Юрьевна"]').click() 
//В верхней части интерфейса, в панели инструментов (кнопок) нажать   и найти коды оплат 1 и 86 (убедиться, что они присутствуют) . 
    cy.get('[data-value="Постоянные доплаты"]').click()   
    cy.wait(3000)
    cy.get('[ng-reflect-value="Разовая премия"]')
    cy.get('[ng-reflect-value="Сдельная оплата"]')
//Нажать экранную кнопку [Сохранить и закрыть], будет открыт на экране перечень лицевых счетов
    cy.get('[ng-reflect-text="Отменить"]').eq(1).click()  
    cy.wait(3000)
//Нажать экранную кнопку [Сохранить и закрыть], будет открыта домашняя страница
    cy.get('[ng-reflect-text="Отменить"]').click()  
    cy.wait(3000)

    })

})