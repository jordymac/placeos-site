console.log('usecases-filter.js loaded');

// Make sure this function is available globally for Alpine.js
window.useCasesFilter = function() {
  return {
    useCases: Array.isArray(window.useCasesData) ? window.useCasesData : [],
    searchTerm: '',
    selectedIntegration: '',
    selectedIndustry: '',
    selectedProduct: '',
    allIntegrations: [],
    allIndustries: [],
    allProducts: [],
    filteredUseCases: [],

    init() {
      console.log('Alpine.js initializing...');
      console.log('window.useCasesData:', window.useCasesData);
      console.log('this.useCases type:', typeof this.useCases);
      console.log('this.useCases is array?', Array.isArray(this.useCases));
      console.log('this.useCases:', this.useCases);
      
      // Ensure useCases is always an array
      if (!Array.isArray(this.useCases)) {
        console.warn('useCases is not an array, setting to empty array');
        this.useCases = [];
      }
      
      this.extractFilterOptions();
      this.filterUseCases();
      console.log('Filtered use cases after init:', this.filteredUseCases.length);
      this.$watch('searchTerm', () => this.filterUseCases());
      this.$watch('selectedIntegration', () => this.filterUseCases());
      this.$watch('selectedIndustry', () => this.filterUseCases());
      this.$watch('selectedProduct', () => this.filterUseCases());
    },

    extractFilterOptions() {
      const integrations = new Set();
      const industries = new Set();
      const products = new Set();

      this.useCases.forEach(useCase => {
        if (useCase.integrations) {
          useCase.integrations.forEach(integration => integrations.add(integration));
        }
        if (useCase.industry) {
          useCase.industry.forEach(industry => industries.add(industry));
        }
        if (useCase.product) {
          useCase.product.forEach(product => products.add(product));
        }
      });

      this.allIntegrations = Array.from(integrations).sort();
      this.allIndustries = Array.from(industries).sort();
      this.allProducts = Array.from(products).sort();
    },

    filterUseCases() {
      this.filteredUseCases = this.useCases.filter(useCase => {
        const matchesSearch = this.searchTerm === '' || 
          useCase.usecase.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          useCase.description.toLowerCase().includes(this.searchTerm.toLowerCase());

        const matchesIntegration = this.selectedIntegration === '' ||
          (useCase.integrations && useCase.integrations.includes(this.selectedIntegration));

        const matchesIndustry = this.selectedIndustry === '' ||
          (useCase.industry && useCase.industry.includes(this.selectedIndustry));

        const matchesProduct = this.selectedProduct === '' ||
          (useCase.product && useCase.product.includes(this.selectedProduct));

        return matchesSearch && matchesIntegration && matchesIndustry && matchesProduct;
      });
    },

    hasActiveFilters() {
      return this.selectedIntegration !== '' || this.selectedIndustry !== '' || this.selectedProduct !== '';
    },

    clearAllFilters() {
      this.selectedIntegration = '';
      this.selectedIndustry = '';
      this.selectedProduct = '';
      this.searchTerm = '';
    }
  };
};