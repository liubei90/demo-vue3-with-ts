import { shallowMount } from '@vue/test-utils';
import App from '@/comps/App';

describe('comps', () => {
  it('renders App.vue', () => {
    const wrapper = shallowMount(App);

    expect(wrapper.text()).toEqual('hello, comps');
  });
});
