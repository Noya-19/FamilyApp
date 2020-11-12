<template>
    <main class="shopping">
        <form id="shopping-list">
            <h2>Shopping List</h2>
            <table id="shopping-list-table" class="table table-condensed table-hover">
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Item</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tr v-for="(item, index) in itemsList">
                    <td>
                        <span v-show="!item.inEditMode">{{ item.quantity }}</span>
                        <input type="number" v-bind:placeholder="item.quantity" v-show="item.inEditMode" v-model="item.quantity" />
                    </td>
                    <td>
                        <span v-show="!item.inEditMode">{{ item.itemName }}</span>
                        <input v-bind:placeholder="item.itemName" v-show="item.inEditMode" v-model="item.itemName" />
                    </td>
                    <td>
                        <button type="button" class="btn btn-success" v-show="item.inEditMode" @click="editItemComplete(item)"><i class="fa fa-save"></i> Save  </button>
                        <button type="button" class="btn btn-info" v-show="!item.inEditMode" @click="editItem(item)"><i class="fa fa-edit"></i> Edit  </button>
                        <button type="button" class="btn btn-danger" @click="removeItem(index)"><i class="fa fa-remove"></i> Delete  </button>
                    </td>
                </tr>
            </table>
            <h4>Add new item</h4>
            <div class="row col-md-6">
                <div class="col-md-6 form-group">
                    Quantity
                    <input type="number" v-model="quantity" class="checkbox" autofocus>
                </div>
                <div class="col-md-6 form-group">
                    Name
                    <input type="text" v-model="itemName" class="checkbox">
                </div>

                <button type="button" @click="addItem" class="btn btn-primary"><i class="fa fa-plus"></i> Add  </button>
            </div>
        </form>
        <div class="grid-container">
            <div class="item1">1</div>
            <div class="item2">2</div>
            <div class="item3">3</div>

        </div>
    </main>
</template>

<script>
export default {
  name: 'Shopping',
  title: 'shopping-list-table',
  props: {
  },
    data: {
        quantity: '',
        itemName: '',
        itemsList: [
            {
                quantity: 3,
                itemName: "Apples",
                inEditMode: false
            },
            {
                quantity: 6,
                itemName: "Pears",
                inEditMode: false

            }],
        inEditMode: false
    },
    methods: {
        addItem: function () {
            var quantityIN = this.quantity;
            var itemNameIN = this.itemName.trim();
            this.itemsList.push({
                quantity: quantityIN,
                itemName: itemNameIN,
                inEditMode: false
            });
            this.clearAll();
        },
        clearQuantity: function () {
            this.quantity = '';
        },
        clearItemName: function () {
            this.itemName = '';
        },
        clearAll: function () {
            this.clearQuantity();
            this.clearItemName();
        },
        removeItem: function (index) {
            this.itemsList.splice(index, 1); //delete 1 element from the array at the position index
        },
        editItem: function (item) {
            item.inEditMode = true;
        },
        editItemComplete: function (item) {
            item.inEditMode = false;
        }

    }
}
</script>

<style lang="scss">
    body {
        padding: 1%;
        background-color: #abca
    }

    h2, h4 {
        font-family: 'Nunito', sans-serif;
    }


    #shopping-list-table {
        table-layout: fixed;
        width: 50%;
        vertical-align: middle;
    }

    button {
        margin-left: 2%;
    }
    .grid-container {
        display: grid;
        grid-template-columns: auto auto auto;
        grid-gap: 10px;
        background-color: #2196F3;
        padding: 10px;
    }

        .grid-container > div {
            background-color: rgba(255, 255, 255, 0.8);
           text-align: center;
            padding: 20px 0;
            font-size: 30px;
        }

    .item1 {
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .item2 {
        grid-row-start: 1;
        grid-row-end: 3;
    }
    .item3 {
        grid-row-start: 1;
        grid-row-end: 3;
    }
</style>
