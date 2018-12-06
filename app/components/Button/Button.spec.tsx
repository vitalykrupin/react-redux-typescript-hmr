import * as React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

const props = {
    text: 'Sample text',
    className: 'sampleClass',
    id: 'sampleID',
    onClick: jest.fn(),
    settings: 'sample'
};
const enzymeWrapper = mount(<Button {...props} />);

describe('/components/Button', () => {
    it('should exist', () => {
        expect(enzymeWrapper.find('button').length).toBe(1);
    });
    it('should invoke passed callback', () => {
        const button = enzymeWrapper.find('button');
        enzymeWrapper.simulate('click');
        expect(props.onClick.mock.calls.length).toBe(1);
    });
    it('should apply all passed properties', () => {
        const button = enzymeWrapper.find('button');
        expect(button.find('.sampleClass').length).toBe(1);
        expect(button.find('#sampleID').length).toBe(1);
        expect(button.text()).toBe('Sample text');
        expect(button.find('[settings="sample"]').length).toBe(1);
    });
    it('should render child elements', () => {
        const props = {
            onClick: () => { }
        },
            enzymeWrapper = mount(<Button {...props}>
                <div className='innerElement'>InnerText</div>
            </Button>),
            button = enzymeWrapper.find('button');

        expect(button.length).toBe(1);
        expect(button.find('.innerElement').length).toBe(1);
        expect(button.find('.innerElement').text()).toBe('InnerText');
    });
});
