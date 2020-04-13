import VueI18n from 'vue-i18n';
// @ts-ignore
import enLocale from 'element-ui/lib/locale/lang/en';

// https://kazupon.github.io/vue-i18n/guide/formatting.html
export default <VueI18n.LocaleMessages> {
    en: {
        month: {
            0: 'January',
            1: 'February',
            2: 'March',
            3: 'April',
            4: 'May',
            5: 'June',
            6: 'Jule',
            7: 'August',
            8: 'September',
            9: 'October',
            10: 'November',
            11: 'December',
        },
        countries: {
            Canada: 'Canada',
            France: 'France',
            Germany: 'Germany',
            UK: 'UK',
            Brazil: 'Brazil',
        },

        ...enLocale,
    },
};
