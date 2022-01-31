import { render, screen } from '@testing-library/react'
import DeleteConfirmDialogue from './DeleteConfirmDialogue'

it('Dialogue show not be rendered when open false ', () => {
    render(<DeleteConfirmDialogue open={false} />);
    expect(screen.findAllByText('button').length).toBeUndefined();
})

it('Dialogue show rendered when open true ', () => {
    let el = render(<DeleteConfirmDialogue open={true} />);
    let buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
// / console.log(buttons[0].getElementsByTagName('span'))
    // expect(buttons[0].getElementsByTagName('span')).toBe('')
})