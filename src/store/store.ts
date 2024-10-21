// [全局状态] more...

/**
 * more...
 */

import { proxy } from "valtio";

interface More {
  store: string;
}

export const more = proxy<More>({
  store: "store",
});
