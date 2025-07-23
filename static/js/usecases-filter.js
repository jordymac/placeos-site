console.log('usecases-filter.js loaded');

// Helper function to get integration description
function getIntegrationDescription(integrationKey) {
  const categories = window.integrationCategories || {};
  const category = categories[integrationKey];
  return category ? category.description : null;
}

function useCasesFilter() {
  // Parse JSON string if needed
  let parsedData = window.useCasesData || [];
  if (typeof window.useCasesData === 'string') {
    try {
      parsedData = JSON.parse(window.useCasesData);
      console.log('Parsed data:', parsedData);
      console.log('Parsed data is array?', Array.isArray(parsedData));
    } catch (e) {
      console.error('Failed to parse JSON:', e);
      parsedData = [];
    }
  }
  
  return {
    useCases: Array.isArray(parsedData) ? parsedData : [],
    searchTerm: '',
    selectedIntegration: '',
    selectedIndustry: '',
    selectedProduct: '',
    allIntegrations: [],
    allIndustries: [],
    allProducts: [],
    filteredUseCases: [],

    init() {
      console.log('Alpine init - useCases:', this.useCases);
      console.log('Alpine init - useCases length:', this.useCases.length);
      console.log('Alpine init - useCases is array?', Array.isArray(this.useCases));
      
      if (!Array.isArray(this.useCases)) {
        console.error('useCases is not an array!', this.useCases);
        this.useCases = [];
      }
      
      this.extractFilterOptions();
      this.filterUseCases();
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
}