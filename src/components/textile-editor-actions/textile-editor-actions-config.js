import type { ActionButton } from '../../flow-typed/textile-editor';
import { ActionGroups } from '../../flow-typed/textile-editor';

export const ActionsConfig: ActionButton[] = [{
  icon: 'bold',
  label: 'Bold',
  group: ActionGroups.TEXT,
  action: {
    symbol: '*',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'italic',
  label: 'Italic',
  group: ActionGroups.TEXT,
  action: {
    symbol: '_',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'underline',
  label: 'Underline',
  group: ActionGroups.TEXT,
  action: {
    symbol: '+',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'strikethrough',
  label: 'Strikethrough',
  group: ActionGroups.TEXT,
  action: {
    symbol: '-',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'subscript',
  label: 'Subscript',
  group: ActionGroups.TEXT,
  action: {
    symbol: '~',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'superscript',
  label: 'Superscript',
  group: ActionGroups.TEXT,
  action: {
    symbol: '^',
    wrap: true,
    spaced: false
  }
}, {
  icon: 'align-left',
  label: 'Align left',
  group: ActionGroups.ALIGN,
  action: {
    symbol: 'p<.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'align-center',
  label: 'Align center',
  group: ActionGroups.ALIGN,
  action: {
    symbol: 'p=.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'align-right',
  label: 'Align right',
  group: ActionGroups.ALIGN,
  action: {
    symbol: 'p>.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'align-justify',
  label: 'Align justify',
  group: ActionGroups.ALIGN,
  action: {
    symbol: 'p<>.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'list-ul',
  label: 'Bullet list',
  group: ActionGroups.LIST,
  action: {
    symbol: '*',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'list-ol',
  label: 'Numbered list',
  group: ActionGroups.LIST,
  action: {
    symbol: '#',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'header',
  label: 'Header 1',
  subtext: '1',
  group: ActionGroups.HEADER,
  action: {
    symbol: 'h1.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'header',
  label: 'Header 2',
  subtext: '2',
  group: ActionGroups.HEADER,
  action: {
    symbol: 'h2.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'header',
  label: 'Header 3',
  subtext: '3',
  group: ActionGroups.HEADER,
  action: {
    symbol: 'h3.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'header',
  label: 'Header 4',
  subtext: '4',
  group: ActionGroups.HEADER,
  action: {
    symbol: 'h4.',
    wrap: false,
    spaced: true
  }
}, {
  icon: 'link',
  label: 'Link',
  group: ActionGroups.OTHER,
  prompt: {
    inputs: [{
      label: 'Link text',
      name: 'link-text',
      action: {
        symbol: '"',
        wrap: true,
        spaced: false
      }
    }, {
      label: 'Link URL',
      name: 'link-url',
      action: {
        symbol: ':',
        wrap: false,
        spaced: false
      }
    }]
  }
}, {
  icon: 'image',
  label: 'Image',
  group: ActionGroups.OTHER,
  prompt: {
    inputs: [{
      label: 'Image URL',
      name: 'image-url',
      action: {
        symbol: '!',
        wrap: true,
        spaced: false
      }
    }]
  }
}, {
  icon: 'quote-right',
  label: 'Blockquote',
  group: ActionGroups.OTHER,
  action: {
    symbol: 'bq.',
    wrap: false,
    spaced: true
  }
}];