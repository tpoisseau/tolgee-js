import '@testing-library/jest-dom';
import { UI } from '../index';
import { sleep } from '../tools/sleep';
import { getRoot } from '../tools/getRoot';

function getShadowRootElement(testId: string, textContent: string) {
  const shadowRoot = getRoot();

  return Array.from(
    shadowRoot.querySelectorAll(`*[data-testid="${testId}"]`)
  ).find((el) => el.textContent === textContent);
}

test('it selects the key', async () => {
  const ui = new UI({
    apiKey: 'test',
    apiUrl: 'test',
    projectId: undefined,
    highlight: () => ({ unhighlight: () => {} }),
    changeTranslation: () => ({ revert: () => {} }),
    findPositions: () => [],
  });
  const mouseEvent = new MouseEvent('click');

  Object.defineProperty(mouseEvent, 'target', {
    writable: false,
    value: document.body,
  });

  const keys = new Map([
    ['key 1', 'Key 1'],
    ['key 2', 'Key 2'],
  ]);
  // open context menu and wait for select
  const resultPromise = ui.getKey({ openEvent: mouseEvent, keys: keys });

  await sleep(10);

  keys.forEach((translation, key) => {
    expect(
      getShadowRootElement('key_context_menu_translation', translation)
    ).toBeTruthy();
    expect(getShadowRootElement('key_context_menu_key', key)).toBeTruthy();
  });

  getShadowRootElement(
    'key_context_menu_translation',
    'Key 2'
  )!.parentElement!.click();

  const result = await resultPromise;
  expect(result).toEqual('key 2');
});
