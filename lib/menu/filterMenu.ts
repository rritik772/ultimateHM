import { MenuModal } from "../../model/MenuModal";

/**
 * It takes an array of objects, and returns an array of strings
 * @param {MenuModal[]} menu_json - menuJsonInterface[]
 * @returns An array of strings
 */
const get_categories = (menu_json: MenuModal[]): string[] => {
    return Array.from(
        new Set(
            menu_json.map(item => item.category)
        )
    )
}

/**
 * It takes in an array of categories and a menu json, and returns a map of categories to menu items
 * @param {string[]} categories - string[] - An array of strings that represent the categories of the
 * menu.
 * @param {MenuModal[]} menu_json - menuJsonInterface[]
 * @returns A Map of categories and menu items
 */
const get_menu_as_category = (
    categories: string[],
    menu_json: MenuModal[]
): Map<string, MenuModal[]> => {
    const filtered_with_category = new Map();

    for (let category of categories) {
        filtered_with_category.set(
            category, menu_json.filter(
                item => item['category'] === category
            )
        )
    }

    return filtered_with_category;
}

/**
 * It takes a menu json and returns a filtered menu json with the menu items grouped by category
 * @param {MenuModal[]} menu_json - the json object that you get from the API
 * @returns An array of objects with the following structure:
 * [
 *     {
 *         category: "",
 *         items: [
 *             {
 *                 name: "",
 *                 price: "",
 *                 description: ""
 *             }
 *         ]
 *     }
 * ]
 */
const filterMenu = (menu_json: MenuModal[]): Map<string, MenuModal[]> => {
    const categories = get_categories(menu_json)
    const filtered_with_category = get_menu_as_category(categories, menu_json);

    return filtered_with_category;
}


export default filterMenu;