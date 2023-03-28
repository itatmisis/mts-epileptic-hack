import json
from transformers import RobertaConfig, RobertaModelWithHeads, TrainingArguments, \
    RobertaTokenizer, TextClassificationPipeline
import torch
from preprocess import preprocess
import warnings

warnings.filterwarnings("ignore")

device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

training_args = TrainingArguments(
    learning_rate=1e-4,
    num_train_epochs=20,
    per_device_train_batch_size=32,
    per_device_eval_batch_size=32,
    logging_steps=10,
    output_dir="./training_output",
    overwrite_output_dir=False,
    # The next line is important to ensure the dataset labels are properly passed to the model
    remove_unused_columns=True,

)


def get_digits(str1):
    c = ""
    for i in str1:
        if i.isdigit():
            c += i
    return c


def get_response(text: str) -> list:
    response = []
    digits = get_digits(text)
    label = classifier(text)[0]['label']
    response.append(label)
    response.append(digits)
    if label != 'pause/play':
        count_to = text.find('до')
        count_forward = text.find('на')
        if count_forward == -1 and count_to == -1:
            response.append('максимум или минимум или константное значение')
        elif count_forward >= count_to:
            response.append('на')
        else:
            response.append('до')
    else:
        response.append('None')

    return response


class Adapter:
    def __init__(self):
        self.classifier = TextClassificationPipeline(model=Adapter.load_model(self),
                                                     tokenizer=Adapter.load_tokenizer(self),
                                                     device=training_args.device.index)

    def load_config(self):
        config = RobertaConfig.from_pretrained(
            'models/adapters/adapter_v4/config.json',
            num_labels=2,
        )
        return config

    def load_model(self):
        model = RobertaModelWithHeads.from_pretrained(
            'models/adapters/adapter_v4/pytorch_model.bin',
            config=Adapter.load_config(self)
        )
        model.set_active_adapters("docs")
        return model

    def load_tokenizer(self):
        tokenizer = RobertaTokenizer.from_pretrained('sberbank-ai/ruRoberta-large')
        return tokenizer

    def get_response(self, text: str) -> list:
        response = []
        digits = get_digits(text)
        label = self.classifier(text)[0]['label']
        response.append(label)
        response.append(digits)
        if label != 'pause/play':
            count_to = text.find('до')
            count_forward = text.find('на')
            if count_forward == -1 and count_to == -1:
                response.append('максимум или минимум или константное значение')
            elif count_forward >= count_to:
                response.append('на')
            else:
                response.append('до')
        else:
            response.append('None')

        return response

# example
# ad = Adapter(text)
# print(ad.predict_sentences(text))
