import { CardEvent, Transaction } from './types'

type CardTransactionMapping = {
  [cardId: string]: Transaction
}

/**
 * Write a function that receives a large batch of card events from multiple cards,
 * returning an object which maps from cardId -> valid transaction. Only cardIds with
 * a valid transaction should appear in the returned object.
 *
 * A valid transaction is a pair of card events, starting with a RESERVATION event
 * and finishing with either a CONFIRMATION or CANCELLATION event.
 *
 * The input is an array of unprocessed card events. Some events might be duplicated
 * or missing. For duplicated events, you may only use one of its occurrences and
 * discard the rest. Missing events invalidate the transaction.
 *
 * @param cardEvents CardEvent[] List of card events
 * @returns CardTransactionMapping Valid transactions grouped by cardId
 */
export const processCardEvents = (cardEvents: CardEvent[]): CardTransactionMapping => {

  // logic
  var charle = cardEvents.filter((el) =>
  {
    return el.cardId == 'CHARLIE'
  });
  var alice = cardEvents.filter((el) => { 
    return el.cardId == 'ALICE';
  }
  );
  var bob = cardEvents.filter((el) => {
    return el.cardId == 'BOB'
  });

  // CHARLIE
  var C_res =charle.filter((el) => el.type==='RESERVATION');
  var C_confirm =charle.filter((el) => el.type==='CONFIRMATION');
  var C_cancel =charle.filter((el) => el.type==='CANCELLATION');
 
 
  let arr_CR: CardEvent[] = []
  let obj_CR: {[key:string]:number} = {};
  for (let i = 0; i < C_res.length; i++) {
    if (obj_CR[C_res[i].id]==undefined) {
      obj_CR[C_res[i].id] = 1;
      arr_CR.push(C_res[i]);
    } else { 
      obj_CR[C_res[i].id]++;
    }
  }
  let arr_CC:CardEvent[]=[]
  let obj_CC: {[key:string]:number} = {};
  for (let i = 0; i <C_confirm.length; i++) {
    if (obj_CC[C_confirm[i].id]==undefined) {
      obj_CC[C_confirm[i].id] = 1;
      arr_CC.push(C_confirm[i]);
    } else { 
      obj_CC[C_confirm[i].id]++;
    }
  }
    let arr_CCNC:CardEvent[]=[]
  let obj_CCNC: {[key:string]:number} = {};
  for (let i = 0; i <C_cancel.length; i++) {
    if (obj_CCNC[C_cancel[i].id]==undefined) {
      obj_CCNC[C_cancel[i].id] = 1;
      arr_CCNC.push(C_cancel[i]);
    } else { 
      obj_CCNC[C_cancel[i].id]++;
    }
   }
  
   // ALICE 
  
  var A_res =alice.filter((el) => el.type==='RESERVATION');
  var A_confirm =alice.filter((el) => el.type==='CONFIRMATION');
  var A_cancel =alice.filter((el) => el.type==='CANCELLATION');
 
 
  let arr_AR: CardEvent[] = []
  let obj_AR: {[key:string]:number} = {};
  for (let i = 0; i < A_res.length; i++) {
    if (obj_AR[A_res[i].id]==undefined) {
      obj_AR[A_res[i].id] = 1;
      arr_AR.push(A_res[i]);
    } else { 
      obj_AR[A_res[i].id]++;
    }
  }
  let arr_AC:CardEvent[]=[]
  let obj_AC: {[key:string]:number} = {};
  for (let i = 0; i <A_confirm.length; i++) {
    if (obj_AC[A_confirm[i].id]==undefined) {
      obj_AC[A_confirm[i].id] = 1;
      arr_AC.push(A_confirm[i]);
    } else { 
      obj_AC[A_confirm[i].id]++;
    }
  }
    let arr_ACNC:CardEvent[]=[]
  let obj_ACNC: {[key:string]:number} = {};
  for (let i = 0; i <A_cancel.length; i++) {
    if (obj_ACNC[A_cancel[i].id]==undefined) {
      obj_ACNC[A_cancel[i].id] = 1;
      arr_ACNC.push(A_cancel[i]);
    } else { 
      obj_ACNC[A_cancel[i].id]++;
    }
   }
  
  // BOB

  var B_res =bob.filter((el) => el.type==='RESERVATION');
  var B_confirm =bob.filter((el) => el.type==='CONFIRMATION');
  var B_cancel =bob.filter((el) => el.type==='CANCELLATION');
 
  
    let arr_BR: CardEvent[] = []
    let obj_BR: {[key:string]:number} = {};
    for (let i = 0; i < B_res.length; i++) {
      if (obj_BR[B_res[i].id]==undefined) {
        obj_BR[B_res[i].id] = 1;
        arr_BR.push(B_res[i]);
      } else { 
        obj_BR[B_res[i].id]++;
      }
    }
    let arr_BC:CardEvent[]=[]
    let obj_BC: {[key:string]:number} = {};
    for (let i = 0; i <B_confirm.length; i++) {
      if (obj_BC[A_confirm[i].id]==undefined) {
        obj_BC[A_confirm[i].id] = 1;
        arr_BC.push(A_confirm[i]);
      } else { 
        obj_BC[A_confirm[i].id]++;
      }
    }
    let arr_BCNC:CardEvent[]=[]
    let obj_BCNC: {[key:string]:number} = {};
    for (let i = 0; i <B_cancel.length; i++) {
      if (obj_BCNC[B_cancel[i].id]==undefined) {
        obj_BCNC[B_cancel[i].id] = 1;
        arr_BCNC.push(B_cancel[i]);
      } else { 
        obj_BCNC[B_cancel[i].id]++;
      }
    }

  // console.log("BOB",arr_BCNC, arr_BC, arr_BR);
  // console.log("CHARLE",arr_CCNC, arr_CC, arr_CR);
  // console.log("ALICE", arr_ACNC, arr_AC, arr_AR);
  
  let valid_txn: CardTransactionMapping = {};
  
  let bob_txn=[]
  for (let i = 0; i < arr_BR.length; i++) {
    if (arr_BC.length > 0) { 
      for (let j = 0; j < arr_BC.length; j++) {
        if (arr_BR[i].amount == arr_BC[j].amount) { 
            bob_txn.push(arr_BR[i])
            bob_txn.push(arr_BC[j])
        }
      }
    }
    else if(arr_BCNC.length>0) {
      for (let j = 0; j < arr_BCNC.length; j++) { 
        if (arr_BR[i].amount === arr_BCNC[j].amount) {
          bob_txn.push(arr_BR[i])
          bob_txn.push(arr_BCNC[j])
        }
      }
    }
  }

  //alice _txn

  let alice_txn=[]
  for (let i = 0; i < arr_AR.length; i++) {
    if (arr_AC.length > 0) { 
      for (let j = 0; j < arr_AC.length; j++) {
        if (arr_AR[i].amount == arr_AC[j].amount) { 
            alice_txn.push(arr_AR[i])
            alice_txn.push(arr_AC[j])
        }
      }
    }
    else if(arr_ACNC.length>0) {
      for (let j = 0; j < arr_ACNC.length; j++) { 
        if (arr_AR[i].amount === arr_ACNC[j].amount) {
          alice_txn.push(arr_AR[i])
          alice_txn.push(arr_ACNC[j])
        }
      }
    }
  }
  
  // charlie_txn
  let charlie_txn = [];
  for (let i = 0; i < arr_CR.length; i++) {
    if (arr_CC.length > 0) { 
      for (let j = 0; j < arr_CC.length; j++) {
        if (arr_CR[i].amount == arr_CC[j].amount) { 
            charlie_txn.push(arr_CR[i])
            charlie_txn.push(arr_CC[j])
        }
      }
    }
    else if(arr_CCNC.length>0) {
      for (let j = 0; j < arr_CCNC.length; j++) { 
        if (arr_CR[i].amount === arr_CCNC[j].amount) {
          charlie_txn.push(arr_CR[i])
          charlie_txn.push(arr_CCNC[j])
        }
      }
    }
   }

  valid_txn = {
    "ALICE": alice_txn,
    "BOB": bob_txn,
//     "CHARLIE":charlie_txn
  }
  // console.log(valid_txn)

  return valid_txn as CardTransactionMapping
}
