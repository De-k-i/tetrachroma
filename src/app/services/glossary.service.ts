import { Injectable, signal, computed } from '@angular/core';
import { GLOSSARY_TERMS, GlossaryCategory, GlossaryTerm } from '../models/glossary.model';

@Injectable({
  providedIn: 'root'
})
export class GlossaryService {
  readonly allTerms = signal<GlossaryTerm[]>(GLOSSARY_TERMS);
  readonly selectedCategory = signal<'TODOS' | GlossaryCategory>('TODOS');
  readonly searchQuery = signal<string>('');

  readonly filteredTerms = computed(() => {
    const list = this.allTerms();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();

    return list.filter(t => {
      const matchCat = cat === 'TODOS' || t.category === cat;
      const matchQuery =
        !query ||
        t.name.toLowerCase().includes(query) ||
        t.shortDefinition.toLowerCase().includes(query) ||
        t.fullDefinition.toLowerCase().includes(query);

      return matchCat && matchQuery;
    });
  });

  getTerm(key: string): GlossaryTerm | undefined {
    const normalized = key.toLowerCase().trim();
    return this.allTerms().find(
      t => t.key.toLowerCase() === normalized || t.name.toLowerCase().includes(normalized)
    );
  }
}
