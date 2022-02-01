import { fireEvent, render, screen } from '@testing-library/react'
import DeleteConfirmDialogue from './DeleteConfirmDialogue'

it('Dialogue show not be rendered when open false ', () => {
    render(<DeleteConfirmDialogue open={false} />);
    expect(screen.queryByText('Delete')).toBeFalsy();
})

it('Dialogue show rendered when open true ', () => {
    render(<DeleteConfirmDialogue open={true} />);
    let buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe('Cancel');
    expect(buttons[1].textContent).toBe('Delete');
})

it('OnDelete method is called when deleting Delete ', () => {
    let onDelete= jest.fn();
    render(<DeleteConfirmDialogue open={true} onDelete={onDelete}/>);
    let buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[1]);
    expect(onDelete).toBeCalled();
})

it('OnClose method is called when clicking cancel ', () => {
    let onClose= jest.fn();
    render(<DeleteConfirmDialogue open={true} onClose={onClose}/>);
    let buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    expect(onClose).toBeCalled();
})

