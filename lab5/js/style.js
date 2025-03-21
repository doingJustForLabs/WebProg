export class Style {

    /**
     * Стиль элемента в формате CSS
     * @param {Object} props - объект со свойствами CSS.
     */
    constructor(props = {}) {
        this.props = props;
    }

    /**
     * Добавляет или изменяет свойство (CSS).
     * @param {string} property - название свойства.
     * @param {string} value - значение свойства.
     */
    setProperty = (property, value) => {
        this.props[property] = value;
    }

    /**
     * Возвращает свойства стиля в виде строки.
     * @returns {string}
     */
    stringify = () => {
        if (this.props) {
            let props = Object.entries(this.props);
            return props.map(([key, value]) => `${key}: ${value}`).join("; ");
        } else {
            return "";
        }
    }
}