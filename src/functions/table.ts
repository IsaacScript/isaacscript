/**
 * In a Map, you can use the `clear` method to delete every element. However, in a LuaTable, the
 * `clear` method does not exist. Use this helper function as a drop-in replacement for this.
 */
export function tableClear(table: LuaTable): void {
  for (const [key] of pairs(table)) {
    table.delete(key);
  }
}
