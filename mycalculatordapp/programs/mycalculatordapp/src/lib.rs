use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod mycalculatordapp {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, init_message: String) -> ProgramResult<()> {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_message;
        Ok(())
    }
}
//imports the Accounts macro to the struct, so the account 
//methods are available inside the struct
#[derive(Accounts)]
pub struct create<'info> {
    //create calculator account
    #[account(init, payer=user, space=264)]
    pub calculator: Account<'info, Calculator>
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}

// calculator account properties
#[account]
pub struct Calculator{
    pub greeting: String,
    pub result: i64,
    pub reminder: i64
}