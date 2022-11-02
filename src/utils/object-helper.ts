// Ищем в массиве array объект, у которого по ключу itemKey лежит значение actionValue,
// и в этом объекте заменяем/добавляем свойство newObjProps
import {IUser} from "../store/users/types";

export const objectsHelper = (array: IUser[], itemKey: string, actionValue: number, newObjProps: { followed: boolean }) => {
    return array.map((item: IUser) => {
        if (item[itemKey as keyof IUser] === actionValue) {
            return {...item, ...newObjProps}
        }
        return item
    })
}