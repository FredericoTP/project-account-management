import { ModelStatic } from 'sequelize';
import ExpenseModel from '../database/models/ExpenseModel';
import { validateExpense } from './validations/validationInputValues';
import { Conflict } from '../errors';

class ExpenseService {
  private expenseModel: ModelStatic<ExpenseModel>;

  constructor() {
    this.expenseModel = ExpenseModel;
  }

  public async findAll(): Promise<ExpenseModel[]> {
    const expenses = await this.expenseModel.findAll();

    return expenses;
  }

  public async findExpense(name: string): Promise<ExpenseModel | null> {
    const expense = await this.expenseModel.findOne({
      where: { name },
    });

    return expense;
  }

  public async create(expense: string): Promise<ExpenseModel> {
    validateExpense(expense);

    const checkExpense = await this.findExpense(expense);

    if (checkExpense) throw new Conflict('Expense already exists');

    const newExpense = await this.expenseModel.create({ expense });

    return newExpense;
  }

  public async update(oldExpense: string, newExpense: string): Promise<void> {
    validateExpense(newExpense);

    const checkExpense = await this.findExpense(oldExpense);

    if (!checkExpense) throw new Conflict('Expense doesn\'t exist');

    await this.expenseModel.update(
      { expense: newExpense },
      { where: { expense: oldExpense } },
    );
  }
}

export default ExpenseService;
