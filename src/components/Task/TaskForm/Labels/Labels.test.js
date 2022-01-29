import { render, screen } from "@testing-library/react"
import Labels from "./Labels"

test("Label render",()=>{
    let labels = [{
        value:'1',
        displayName: 'One'
    },{
        value:'2',
        displayName: 'Two'
    },
    {
        value:'3',
        displayName: 'Three'
    }];

    const onChange = jest.fn;
    render(<Labels labels={labels} setLabel={onChange}/>)
    
    const options = screen.getAllByRole('option');
    expect(options.length).toBe(3);
})