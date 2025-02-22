import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

type StateTokens<Output> = DesignTokenProperties<
  'backgroundColor' | 'borderColor' | 'color',
  Output
>;

type ButtonTokens<Output> = DesignTokenProperties<'color', Output> & {
  _active?: StateTokens<Output>;
  _disabled?: StateTokens<Output>;
  _focus?: StateTokens<Output>;
  _hover?: StateTokens<Output>;
};

export type PasswordFieldTokens<Output extends OutputVariantKey> =
  DesignTokenProperties<'color', Output> & {
    button?: ButtonTokens<Output>;
  };

export const passwordfield: Required<PasswordFieldTokens<'default'>> = {
  color: { value: '{components.fieldcontrol.color.value}' },
  button: {
    color: { value: '{components.button.color.value}' },
    _active: {
      backgroundColor: {
        value: '{components.button._active.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._active.borderColor.value}' },
      color: { value: '{components.button._active.color.value}' },
    },
    _disabled: {
      backgroundColor: {
        value: '{components.button._disabled.backgroundColor.value}',
      },
      borderColor: {
        value: '{components.button._disabled.borderColor.value}',
      },
      color: { value: '{components.button._disabled.color.value}' },
    },
    _focus: {
      backgroundColor: {
        value: '{components.button._focus.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._focus.borderColor.value}' },
      color: { value: '{components.button._focus.color.value}' },
    },
    _hover: {
      backgroundColor: {
        value: '{components.button._hover.backgroundColor.value}',
      },
      borderColor: { value: '{components.button._hover.borderColor.value}' },
      color: { value: '{components.button._hover.color.value}' },
    },
  },
};
