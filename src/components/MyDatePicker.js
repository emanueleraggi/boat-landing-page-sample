import React from 'react';
import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';
import omit from 'lodash/omit';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import DefaultTheme from 'react-dates/lib/theme/DefaultTheme';

import {
    DateRangePicker,
    SingleDatePicker,
    DayPickerRangeController,
    DateRangePickerShape,
    DateRangePickerPhrases,
    isInclusivelyAfterDay
} from 'react-dates';

import {
    START_DATE,
    END_DATE,
    HORIZONTAL_ORIENTATION,
    ANCHOR_LEFT,
    NAV_POSITION_TOP,
} from 'react-dates/constants';
// import isInclusivelyAfterDay from 'react-dates/utils/isInclusivelyAfterDay';

const propTypes = {
    // example props for the demo
    autoFocus: PropTypes.bool,
    autoFocusEndDate: PropTypes.bool,
    stateDateWrapper: PropTypes.func,
    initialStartDate: momentPropTypes.momentObj,
    initialEndDate: momentPropTypes.momentObj,

    ...omit(DateRangePickerShape, [
        'startDate',
        'endDate',
        'onDatesChange',
        'focusedInput',
        'onFocusChange',
    ]),
};

const defaultProps = {
    // example props for the demo
    autoFocus: false,
    autoFocusEndDate: false,
    initialStartDate: null,
    initialEndDate: null,

    // input related props
    startDateId: START_DATE,
    startDatePlaceholderText: 'From',
    endDateId: END_DATE,
    endDatePlaceholderText: 'To',
    disabled: false,
    required: false,
    screenReaderInputMessage: '',
    showClearDates: false,
    showDefaultInputIcon: false,
    customInputIcon: null,
    customArrowIcon: null,
    customCloseIcon: null,
    block: false,
    small: false,
    regular: false,

    // calendar presentation and interaction related props
    renderMonthText: null,
    orientation: HORIZONTAL_ORIENTATION,
    anchorDirection: ANCHOR_LEFT,
    horizontalMargin: 0,
    withPortal: false,
    withFullScreenPortal: false,
    initialVisibleMonth: null,
    numberOfMonths: 2,
    keepOpenOnDateSelect: false,
    reopenPickerOnClearDates: false,
    isRTL: false,

    // navigation related props
    navPosition: NAV_POSITION_TOP,
    navPrev: null,
    navNext: null,
    onPrevMonthClick() { },
    onNextMonthClick() { },
    onClose() { },

    // day presentation and interaction related props
    renderCalendarDay: undefined,
    renderDayContents: null,
    minimumNights: 1,
    enableOutsideDays: true,
    isDayBlocked: () => false,
    isOutsideRange: day => isInclusivelyAfterDay(day, moment().add(1, 'd').subtract(1, 'seconds')), // exclude future date
    isDayHighlighted: () => false,

    // internationalization
    displayFormat: () => moment.localeData().longDateFormat('L'),
    monthFormat: 'MMMM YYYY',
    phrases: DateRangePickerPhrases,

    stateDateWrapper: date => date,
};

class DateRangePickerWrapper extends React.Component {
    constructor(props) {
        super(props);

        let focusedInput = null;
        if (props.autoFocus) {
            focusedInput = START_DATE;
        } else if (props.autoFocusEndDate) {
            focusedInput = END_DATE;
        }

        this.state = {
            focusedInput,
            startDate: props.initialStartDate,
            endDate: props.initialEndDate,
        };

        this.onDatesChange = this.onDatesChange.bind(this);
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    async onDatesChange(interval) {
        const { startDate, endDate } = interval;
        const { stateDateWrapper } = this.props;
        this.setState({
            startDate: startDate && stateDateWrapper(startDate),
            endDate: endDate && stateDateWrapper(endDate),
        });

        if (startDate === null || endDate === null || 
            typeof(startDate) === 'undefined' || typeof(endDate) === 'undefined') {
                this.props.changeCalendarSelected(false);
                return null;
        }
        this.props.changeCalendarSelected(true);
        const dateLower = startDate.toDate();
        const endDateCopy = endDate.clone();
        const dateUpper = endDateCopy.add('12', 'hours').toDate(); // include current day
        const response = await fetch('https://boat-landing-page-sample.herokuapp.com/users/vessles/map/latlngdata', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.props.currentShipName,
                offset: {
                    startDate: dateLower,
                    endDate: dateUpper,
                },
            }),
        });
        response.json().then((data) => this.props.processShipRangeData(data, 'DateRangePikcer')).catch(err => console.log(err))
    }

    onFocusChange(focusedInput) {
        this.setState({ focusedInput });
    }

    render() {
        const { focusedInput, startDate, endDate } = this.state;

        // autoFocus, autoFocusEndDate, initialStartDate and initialEndDate are helper props for the
        // example wrapper but are not props on the SingleDatePicker itself and
        // thus, have to be omitted.
        const props = omit(this.props, [
            'autoFocus',
            'autoFocusEndDate',
            'initialStartDate',
            'initialEndDate',
            'stateDateWrapper',
        ]);

        return (
            <div>
                <DateRangePicker
                    {...props}
                    onDatesChange={this.onDatesChange}
                    onFocusChange={this.onFocusChange}
                    focusedInput={focusedInput}
                    startDate={startDate}
                    endDate={endDate}
                />
            </div>
        );
    }
}

DateRangePickerWrapper.propTypes = propTypes;
DateRangePickerWrapper.defaultProps = defaultProps;

ThemedStyleSheet.registerInterface(aphroditeInterface);
ThemedStyleSheet.registerTheme({
    reactDates: {
        ...DefaultTheme.reactDates,
        sizing: {
            inputWidth: 100,
            arrowWidth: 15,
        },
        font: {
            input: {
                size: 10,
                styleDisabled: 'italic',
            }
        },

    },
});

export default DateRangePickerWrapper;