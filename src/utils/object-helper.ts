// Ищем в массиве array обьект, у которого по ключу itemKey лежит значение actionValue,
// и в этом обьекте заменяем/добавляем свойство newObjProps
import {IUser} from "../store/usersReducer";

export const objectsHelper = (array: IUser[], itemKey: string, actionValue: number, newObjProps: { followed: boolean }) => {
    return array.map((item: IUser) => {
        if (item[itemKey as keyof IUser] === actionValue) {
            return {...item, ...newObjProps}
        }
        return item
    })
}