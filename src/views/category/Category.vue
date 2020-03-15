<template>
  <div class="wrapper">
    <ul class="content">
      <li>l1</li>
      <li>l2</li>
      <li>l3</li>
      <li>l4</li>
      <li>l5</li>
      <li>l6</li>
      <li>l7</li>
      <li>l8</li>
      <li>l9</li>
      <li>l10</li>
      <li>l11</li>
      <li>l12</li>
      <li>l13</li>
      <li>l14</li>
      <li>l15</li>
      <li>l16</li>
      <li>l17</li>
      <li>l18</li>
      <li>l19</li>
      <li>l20</li>
      <li>l21</li>
      <li>l22</li>
      <li>l23</li>
      <li>l24</li>
      <li>l25</li>
      <li>l26</li>
      <li>l27</li>
      <li>l28</li>
      <li>l29</li>
      <li>l30</li>
      <li>l31</li>
      <li>l32</li>
      <li>l33</li>
      <li>l34</li>
      <li>l35</li>
      <li>l36</li>
      <li>l37</li>
      <li>l38</li>
      <li>l39</li>
      <li>l40</li>
      <li>l41</li>
      <li>l42</li>
      <li>l43</li>
      <li>l44</li>
      <li>l45</li>
      <li>l46</li>
      <li>l47</li>
      <li>l48</li>
      <li>l49</li>
      <li>l50</li>
      <li>l51</li>
      <li>l52</li>
      <li>l53</li>
      <li>l54</li>
      <li>l55</li>
      <li>l56</li>
      <li>l57</li>
      <li>l58</li>
      <li>l59</li>
      <li>l60</li>
      <li>l61</li>
      <li>l62</li>
      <li>l63</li>
      <li>l64</li>
      <li>l65</li>
      <li>l66</li>
      <li>l67</li>
      <li>l68</li>
      <li>l69</li>
      <li>l70</li>
      <li>l71</li>
      <li>l72</li>
      <li>l73</li>
      <li>l74</li>
      <li>l75</li>
      <li>l76</li>
      <li>l77</li>
      <li>l78</li>
      <li>l79</li>
      <li>l80</li>
      <li>l81</li>
      <li>l82</li>
      <li>l83</li>
      <li>l84</li>
      <li>l85</li>
      <li>l86</li>
      <li>l87</li>
      <li>l88</li>
      <li>l89</li>
      <li>l90</li>
      <li>l91</li>
      <li>l92</li>
      <li>l93</li>
      <li>l94</li>
      <li>l95</li>
      <li>l96</li>
      <li>l97</li>
      <li>l98</li>
      <li>l99</li>
      <li>l100</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll('.wrapper', {
      probeType: 3,
      pullUpLoad: true
    });
    this.scroll.on('scroll', (position) => {
      // console.log(position)
    });
    this.scroll.on('pullingUp', () => {
      // console.log("**********");
    })
  },
}
</script>

<style scoped>
  .wrapper {
    height: 150px;
    background: red;
  }
</style>