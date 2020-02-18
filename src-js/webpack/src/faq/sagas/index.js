/**
 * This files provide the sagas for FAQ
 *
 * @since 3.26.0
 * @author Naveen Muthusamy <naveen@wordlift.io>
 */

/**
 * External dependencies
 */
import { call, put, select, takeLatest } from "redux-saga/effects";
/**
 * Internal dependencies.
 */
import { REQUEST_FAQ_ADD_NEW_QUESTION, REQUEST_GET_FAQ_ITEMS, UPDATE_FAQ_ITEM } from "../constants/action-types";
import API from "../api/index";
import { getAllFAQItems, getCurrentQuestion } from "../selectors";
import { requestGetFaqItems, resetTypedQuestion, updateFaqItems, updateNotificationArea } from "../actions";
import { transformAPIDataToUi } from "./filters";
import { faqEditItemType } from "../components/faq-edit-item";
import {FAQ_ITEMS_CHANGED} from "../constants/faq-hook-constants";
import {trigger} from "backbone"

function* handleAddNewQuestion(action) {
  const currentQuestion = yield select(getCurrentQuestion);
  const faqItems = [
    {
      question: currentQuestion,
      answer: ""
    }
  ];
  const response = yield call(API.saveFAQItems, faqItems);
  const notificationAction = updateNotificationArea();
  notificationAction.payload = {
    notificationMessage: response.message,
    notificationType: response.status
  };
  yield put(notificationAction);
  yield put(resetTypedQuestion());
  // Refresh the screen by getting new FAQ items.
  yield put(requestGetFaqItems());
}

function* handleGetFaqItems() {
  const faqItems = yield call(API.getFAQItems);
  const action = updateFaqItems();
  action.payload = transformAPIDataToUi(faqItems);
  trigger(FAQ_ITEMS_CHANGED, action.payload)
  yield put(action);
}

function* handleUpdateFaqItems(action) {
  const faqItems = yield select(getAllFAQItems);
  const payload = action.payload;
  const faqItemIndex = faqItems.map(e => e.id).indexOf(payload.id);
  switch (payload.type) {
    case faqEditItemType.ANSWER:
      faqItems[faqItemIndex]["answer"] = payload.value;
      break;
    case faqEditItemType.QUESTION:
      faqItems[faqItemIndex]["question"] = payload.value;
      break;
  }
  const response = yield call(API.updateFAQItems, faqItems);
  const notificationAction = updateNotificationArea();
  notificationAction.payload = {
    notificationMessage: response.message,
    notificationType: response.status
  };
  yield put(notificationAction);
  yield put(requestGetFaqItems());
}

function* rootSaga() {
  yield takeLatest(REQUEST_FAQ_ADD_NEW_QUESTION, handleAddNewQuestion);
  yield takeLatest(REQUEST_GET_FAQ_ITEMS, handleGetFaqItems);
  yield takeLatest(UPDATE_FAQ_ITEM, handleUpdateFaqItems);
}

export default rootSaga;
