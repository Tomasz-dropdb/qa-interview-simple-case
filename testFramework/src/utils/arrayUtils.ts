export default class ArrayUtils {

    static GetRandomElement <T> (array : T[]) : T {

        const length : number = array.length; 

        if (length === 0) {
            throw new Error("Given array has no elements!");
        } 
        
        const index: number = Math.floor(Math.random() * length);

        return array[index];
    }

}